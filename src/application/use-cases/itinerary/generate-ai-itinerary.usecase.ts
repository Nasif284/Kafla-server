import { inject, injectable } from 'tsyringe';
import { IGenerateAiItineraryUseCase } from '../../interfaces/use-cases/itenary/generate-ai-itinerary.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';
import { GroupData } from '../../dtos/group/responce/get-groups.dto';
import { IAiItineraryService } from '../../interfaces/services/ai-itinerary.service.interface';
import { GenerateAiItineraryRequestDTO } from '../../dtos/itenary/request/generate-ai-itinerary.dto';

import { TripPlanningContext } from '../../dtos/itenary/request/ai-itinery-trip-context.dto';
import { GeneratedItinerary } from '../../dtos/itenary/response/ai-itinerary-result.dto';

@injectable()
export class GenerateAiItineraryUseCase implements IGenerateAiItineraryUseCase {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly tripGroupRepository: ITripGroupRepository,

    @inject(TOKENS.IAiItineraryService)
    private readonly aiItineraryService: IAiItineraryService,
  ) {}
  async execute(
    request: GenerateAiItineraryRequestDTO,
  ): Promise<GeneratedItinerary> {
    const group = await this.tripGroupRepository.GetGroupWithDetails(request.groupId);

    if (!group) {
      throw new Error('Trip not found.');
    }

    const context = this.buildTripPlanningContext(group, request);
    return await this.aiItineraryService.generate(context);
  }
  private buildTripPlanningContext(
    group: GroupData,
    request: GenerateAiItineraryRequestDTO,
  ): TripPlanningContext {
    const dest = group.destinationDetails;
    return {
      destination: {
        placeId: dest?.placeId ?? '',
        name: dest?.name ?? group.destination,
        city: dest?.city ?? null,
        state: dest?.state ?? null,
        country: dest?.country ?? '',
        latitude: dest?.latitude ?? 0,
        longitude: dest?.longitude ?? 0,
      },

      trip: {
        startDate: request.arrivalDate || this.formatDate(group.dateFrom),
        endDate: request.departureDate || this.formatDate(group.dateTo),
        travellers: group.members.length,
        arrivalDate: request.arrivalDate,
        arrivalTime: request.arrivalTime,
        departureDate: request.departureDate,
        departureTime: request.departureTime,
      },

      preferences: {
        tripPace: request.tripPace,
        budgetStyle: 'standard',
        travelStyle: 'balanced',
        interests: request.interests,
        companions: request.companions,
        transportMode: request.transportMode,
        accommodationType: request.accommodationType,
        hotelLocationOrStyle: request.hotelLocationOrStyle,
        dietary: request.dietary,
      },

      notes: request.notes,
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
