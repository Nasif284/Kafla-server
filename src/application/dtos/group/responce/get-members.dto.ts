interface Member {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
  joinedAt: Date;
  role: string;
}
export interface GetMembersResponseDTO {
  members: Member[];
  group?: {
    name: string;
    coverUrl: string | null;
  };
}
