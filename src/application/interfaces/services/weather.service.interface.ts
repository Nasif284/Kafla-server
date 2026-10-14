import {
  TripDestination,
  TripWeatherResponseDTO,
} from '../../dtos/group/responce/get-weather.dto';

export interface IWeatherService {
  getCurrentWeather(
    destination: TripDestination,
  ): Promise<TripWeatherResponseDTO>;
}
