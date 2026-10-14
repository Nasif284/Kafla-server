import { SwapActivityRequestDTO } from '../../../dtos/itenary/request/swap-activity.dto';
import { GeneratedActivity } from '../../../dtos/itenary/response/ai-itinerary-result.dto';

export interface ISwapActivityUseCase {
  execute(request: SwapActivityRequestDTO): Promise<GeneratedActivity>;
}
