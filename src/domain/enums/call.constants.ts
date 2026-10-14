export enum CallScope {
  TRIP_GROUP = "TRIP_GROUP",
}

export enum CallMediaType {
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export enum CallStatus {
  RINGING = "RINGING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export enum CallParticipantStatus {
  INVITED = "INVITED",
  JOINED = "JOINED",
  DECLINED = "DECLINED",
  LEFT = "LEFT",
  MISSED = "MISSED",
}
