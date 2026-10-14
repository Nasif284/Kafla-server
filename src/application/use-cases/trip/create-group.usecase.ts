import { inject, injectable } from 'tsyringe';
import {
  CreateGroupDTO,
  ICreateGroup,
} from '../../interfaces/use-cases/trip/create-group.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';
import { IImageService } from '../../interfaces/services/image.service.interace';
import { generateInviteCode } from '../../../shared/helpers/generateUniqueCode';

@injectable()
export class CreateGroup implements ICreateGroup {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly _tripGroupRepository: ITripGroupRepository,
    @inject(TOKENS.IImageService)
    private readonly _imageService: IImageService,
  ) {}

  async execute(dto: CreateGroupDTO): Promise<void> {
    const inviteCode = generateInviteCode();
    let destinationId 
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
      if (!coverUrl) {
        coverUrl = destination.coverUrl ?? undefined;
      }
    }

    if (dto.name && destinationId && dto.dateFrom && dto.dateTo) {
      await this._tripGroupRepository.createGroup({
        name: dto.name,
        destinationId,
        dateFrom: dto.dateFrom,
        dateTo: dto.dateTo,
        userId: dto.userId,
        inviteCode,
        description: dto.description,
        coverUrl,
        currencyCode: dto.currencyCode,
      });
    } else {
      throw new Error(
        'Required data should be provided',
      );
    }
  }
}
