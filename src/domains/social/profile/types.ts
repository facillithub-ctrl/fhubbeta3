export type PublicProfileDTO = {
  id: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
  createdAt: Date; // Novo campo
  email?: string | null;
};