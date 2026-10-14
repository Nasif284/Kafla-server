export interface SwapItineraryDaysDTO {
  groupId: string;
  dayIdA: string;
  dayIdB: string;
}

export interface ISwapItineraryDaysUseCase {
  execute(dto: SwapItineraryDaysDTO): Promise<void>;
}
