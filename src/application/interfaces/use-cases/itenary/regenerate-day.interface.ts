import { RegenerateDayRequestDTO } from '../../../dtos/itenary/request/regenerate-day.dto';
import { GeneratedDay } from '../../../dtos/itenary/response/ai-itinerary-result.dto';

export interface IRegenerateDayUseCase {
  execute(request: RegenerateDayRequestDTO): Promise<GeneratedDay>;
}
