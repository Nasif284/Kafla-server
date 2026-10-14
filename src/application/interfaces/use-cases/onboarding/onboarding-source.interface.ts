import { OnboardingSourceRequestDTO } from '../../../dtos/onboarding/request/source.dto';

export interface IOnboardingSource {
  execute(dto: OnboardingSourceRequestDTO): Promise<void>;
}
