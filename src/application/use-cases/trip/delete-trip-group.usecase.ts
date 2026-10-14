import { inject, injectable } from 'tsyringe';
import {
  IDeleteTripGroup,
  DeleteTripGroupDTO,
} from '../../interfaces/use-cases/trip/delete-trip-group.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';

@injectable()
export class DeleteTripGroup implements IDeleteTripGroup {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly _tripGroupRepository: ITripGroupRepository,
  ) {}

  async execute(dto: DeleteTripGroupDTO): Promise<void> {
    await this._tripGroupRepository.deleteGroup(dto.groupId, dto.userId);
  }
}
