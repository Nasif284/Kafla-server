import { GetTripWeatherRequestDTO } from '../../../dtos/group/request/get-weather.dto';
import { TripWeatherResponseDTO } from '../../../dtos/group/responce/get-weather.dto';

export interface IGetWeather {
  execute(dto: GetTripWeatherRequestDTO): Promise<TripWeatherResponseDTO>;
}
