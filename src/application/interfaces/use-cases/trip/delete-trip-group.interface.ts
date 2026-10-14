export interface DeleteTripGroupDTO {
  groupId: string;
  userId: string;
}

export interface IDeleteTripGroup {
  execute(dto: DeleteTripGroupDTO): Promise<void>;
}
