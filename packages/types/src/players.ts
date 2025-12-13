export type PlayerSnapshot = {
  id: string;
  username: string;
  avatar: string | null;
  games: number;
  wins: number;
  isGuest: boolean;
};
