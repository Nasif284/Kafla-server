import { inject, injectable } from 'tsyringe';
import { IRegenerateDayUseCase } from '../../interfaces/use-cases/itenary/regenerate-day.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { IAiItineraryService } from '../../interfaces/services/ai-itinerary.service.interface';
import { RegenerateDayRequestDTO } from '../../dtos/itenary/request/regenerate-day.dto';
import { GeneratedDay } from '../../dtos/itenary/response/ai-itinerary-result.dto';

@injectable()
export class RegenerateDayUseCase implements IRegenerateDayUseCase {
  constructor(
    @inject(TOKENS.IAiItineraryService)
    private readonly _aiItineraryService: IAiItineraryService,
  ) {}

  async execute(request: RegenerateDayRequestDTO): Promise<GeneratedDay> {
    return await this._aiItineraryService.regenerateDay(request);
  }
}
