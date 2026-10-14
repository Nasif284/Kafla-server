import { inject, injectable } from 'tsyringe';
import {
  IUpdateTripGroup,
  UpdateTripGroupDTO,
} from '../../interfaces/use-cases/trip/update-trip-group.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';
import { IImageService } from '../../interfaces/services/image.service.interace';
import { GroupData } from '../../dtos/group/responce/get-groups.dto';

@injectable()
export class UpdateTripGroup implements IUpdateTripGroup {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly _tripGroupRepository: ITripGroupRepository,
    @inject(TOKENS.IImageService)
    private readonly _imageService: IImageService,
  ) {}

  async execute(dto: UpdateTripGroupDTO): Promise<GroupData> {
    let destinationId: string | undefined;
    let coverUrl = dto.coverUrl;

    if (dto.placeId) {
      let destination = await this._tripGroupRepository.findDestinationByPlaceId(
        dto.placeId,
      );

      const searchTarget =
        dto.city ||
        dto.destinationName?.split(',')[0].trim() ||
        dto.destinationName ||
        dto.name ||
        '';

      if (!destination) {
        const destCover = await this._imageService.getDestinationCover(searchTarget);

        destination = await this._tripGroupRepository.createDestination({
          placeId: dto.placeId,
          name: dto.destinationName || dto.name || '',
          city: dto.city ?? null,
          state: dto.state ?? null,
          countryCode: dto.countryCode || '',
          latitude: dto.latitude || 0,
          longitude: dto.longitude || 0,
          coverUrl: destCover ?? null,
        });
      } else if (!destination.coverUrl) {
        const destCover = await this._imageService.getDestinationCover(searchTarget);
        if (destCover) {
          await this._tripGroupRepository.updateDestinationCover(
            destination.id,
            destCover,
          );
          destination.coverUrl = destCover;
        }
      }

      destinationId = destination.id;
      if (!coverUrl && destination.coverUrl) {
        coverUrl = destination.coverUrl;
      }
    }

    return await this._tripGroupRepository.updateGroup(dto.groupId, dto.userId, {
      name: dto.name,
      description: dto.description,
      coverUrl,
      currencyCode: dto.currencyCode,
      destinationId,
      dateFrom: dto.dateFrom,
      dateTo: dto.dateTo,
    });
  }
}
