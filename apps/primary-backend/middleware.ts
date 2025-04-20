import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization; // bearer token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    console.log("JWT_PUBLIC_KEY:", process.env.JWT_PUBLIC_KEY);
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
      algorithms: ["RS256"],
    });
    const userId = (decoded as any).sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.userId = userId;
    next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
