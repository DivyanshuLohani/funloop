import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "funloop-secret";

export function signJwt(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, SECRET) as {
    userId: string;
    isGuest: boolean;
  };
}
