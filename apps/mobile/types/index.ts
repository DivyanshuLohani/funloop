export interface User {
  id: string;
  email: string;
  displayName?: string;
  isGuest: boolean;
  deviceId: string;
  username: string;
  avatar: string;
  coins: number;
  createdAt: Date;
  updatedAt: Date;
}
