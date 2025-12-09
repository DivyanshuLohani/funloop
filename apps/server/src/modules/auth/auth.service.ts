import { UserService } from "../users/user.service";
import { signJwt } from "../../lib/jwt";
import bcrypt from "bcryptjs";

export const AuthService = {
  // Guest login or create guest user
  async loginGuest(deviceId: string) {
    let user = await UserService.findByDeviceId(deviceId);

    if (!user) user = await UserService.createGuest(deviceId);

    const token = signJwt({
      userId: user.id,
      isGuest: user.isGuest,
    });

    return { user, token };
  },

  // For full users (not needed now, but good to include)
  async login(email: string, password: string) {
    const user = await UserService.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.passwordHash!);
    if (!isValid) throw new Error("Invalid credentials");

    const token = signJwt({
      userId: user.id,
      isGuest: user.isGuest,
    });

    return { user, token };
  },

  async promoteGuest(userId: string, email: string, password: string) {
    const updated = await UserService.promoteGuest(userId, email, password);
    const token = signJwt({ userId: updated.id, isGuest: false });

    return { user: updated, token };
  },
};
