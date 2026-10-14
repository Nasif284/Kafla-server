export enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
  DEACTIVATED = "DEACTIVATED",
}

export enum OnboardingSource {
  FRIENDS_OR_FAMILY = 'Friends or Family',
  SOCIAL_MEDIA = 'Social Media',
  SEARCH_ENGINE = 'Search Engine',
  TRAVEL_BLOG_OR_ARTICLE = 'Travel Blog or Article',
  APP_STORE = 'App Store',
  OTHER = 'Other',
}


export type OtpPurpose = 'password_reset' | 'email_verify';
