import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../../lib/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = verifyJwt(token);
    (req as any).user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
