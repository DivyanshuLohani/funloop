export interface User {
  id: string;
  email: string;
  isGuest: boolean;
  deviceId: string;
  username: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
