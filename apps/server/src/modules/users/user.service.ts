import { prisma } from "@funloop/database";
import { PlayerSnapshot } from "@funloop/types/index";
import bcrypt from "bcryptjs";

export const UserService = {
  findByDeviceId: (deviceId: string) => {
    return prisma.user.findUnique({ where: { deviceId } });
  },

  createGuest: (deviceId: string) => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return prisma.user.create({
      data: {
        username: `Guest${random}`,
        deviceId,
        isGuest: true,
      },
    });
  },

  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  createWithEmail: async (email: string, password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        isGuest: false,
        username: email.split("@")[0],
      },
    });
  },

  promoteGuest: async (userId: string, email: string, password: string) => {
    // first check if the user is already a full user
    const user = await UserService.findByEmail(email);
    if (user) throw new Error("User already exists");

    const hash = await bcrypt.hash(password, 12);
    return prisma.user.update({
      where: { id: userId },
      data: {
        email,
        passwordHash: hash,
        isGuest: false,
      },
    });
  },

  getUserSnapshot: async (userId: string): Promise<PlayerSnapshot | null> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, avatar: true, isGuest: true },
    });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      isGuest: user.isGuest,
      games: 0,
      wins: 0,
    };
  },

  getUserSnapshotMany: async (
    userIds: string[]
  ): Promise<Record<string, PlayerSnapshot>> => {
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, avatar: true, isGuest: true },
    });
    // Create a map like this id: data
    const playerMap = users.reduce((acc, user) => {
      acc[user.id] = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        isGuest: user.isGuest,
        games: 0,
        wins: 0,
      };
      return acc;
    }, {} as Record<string, PlayerSnapshot>);
    return playerMap;
  },
};
