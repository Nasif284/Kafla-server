import { CreateTripRequestDTO } from '../../../dtos/group/request/create-trip.dto';

export interface ICreateTrip {
  execute(dto: CreateTripRequestDTO): Promise<void>;
}
