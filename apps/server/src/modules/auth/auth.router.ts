import { Router } from "express";
import { AuthService } from "./auth.service";
import { logger } from "@funloop/logger";
import { guestLimiter } from "../../lib/ratelimit";

export const authRouter = Router();

/**
 * Guest login
 */
authRouter.post("/guest", guestLimiter, async (req, res) => {
  logger.info("Registering new Device");
  try {
    const { deviceId } = req.body;
    if (!deviceId) return res.status(400).json({ error: "deviceId required" });
    const result = await AuthService.loginGuest(deviceId);
    res.json(result);
  } catch (e) {
    res
      .status(500)
      .json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

/**
 * Login full user (email/password)
 */
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (e) {
    res
      .status(400)
      .json({ error: e instanceof Error ? e.message : "Invalid login" });
  }
});

/**
 * Promote guest → full account
 */
authRouter.post("/promote", async (req, res) => {
  try {
    const { userId, email, password } = req.body;

    const result = await AuthService.promoteGuest(userId, email, password);
    res.json(result);
  } catch (e) {
    res
      .status(400)
      .json({ error: e instanceof Error ? e.message : "Promotion failed" });
  }
});
