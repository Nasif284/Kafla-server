import { inject, injectable } from 'tsyringe';
import {
  ISwapItineraryDaysUseCase,
  SwapItineraryDaysDTO,
} from '../../interfaces/use-cases/itenary/swap-days.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { IItineraryRepository } from '../../interfaces/repositories/itenary.repository';

@injectable()
export class SwapItineraryDaysUseCase implements ISwapItineraryDaysUseCase {
  constructor(
    @inject(TOKENS.IItineraryRepository)
    private readonly _itineraryRepository: IItineraryRepository,
  ) {}

  async execute(dto: SwapItineraryDaysDTO): Promise<void> {
    await this._itineraryRepository.swapDays(dto.groupId, dto.dayIdA, dto.dayIdB);
  }
}
