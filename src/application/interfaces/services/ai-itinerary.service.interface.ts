import { TripPlanningContext } from '../../dtos/itenary/request/ai-itinery-trip-context.dto';
import { GeneratedActivity, GeneratedDay, GeneratedItinerary } from '../../dtos/itenary/response/ai-itinerary-result.dto';
import { SwapActivityRequestDTO } from '../../dtos/itenary/request/swap-activity.dto';
import { RegenerateDayRequestDTO } from '../../dtos/itenary/request/regenerate-day.dto';

export interface IAiItineraryService {
  generate(context: TripPlanningContext): Promise<GeneratedItinerary>;
  swapActivity(request: SwapActivityRequestDTO): Promise<GeneratedActivity>;
  regenerateDay(request: RegenerateDayRequestDTO): Promise<GeneratedDay>;
}
