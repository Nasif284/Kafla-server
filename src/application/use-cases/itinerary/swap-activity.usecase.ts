import { inject, injectable } from 'tsyringe';
import { ISwapActivityUseCase } from '../../interfaces/use-cases/itenary/swap-activity.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { IAiItineraryService } from '../../interfaces/services/ai-itinerary.service.interface';
import { SwapActivityRequestDTO } from '../../dtos/itenary/request/swap-activity.dto';
import { GeneratedActivity } from '../../dtos/itenary/response/ai-itinerary-result.dto';

@injectable()
export class SwapActivityUseCase implements ISwapActivityUseCase {
  constructor(
    @inject(TOKENS.IAiItineraryService)
    private readonly _aiItineraryService: IAiItineraryService,
  ) {}

  async execute(request: SwapActivityRequestDTO): Promise<GeneratedActivity> {
    return await this._aiItineraryService.swapActivity(request);
  }
}
