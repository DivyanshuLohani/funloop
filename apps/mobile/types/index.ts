export interface User {
  id: string;
  email: string;
  isGuest: boolean;
  deviceId: string;
  username: string;
  avatar: string;
  coins: number;
  createdAt: Date;
  updatedAt: Date;
}
