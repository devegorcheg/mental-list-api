// types
import { UserDb } from "feat/user/schema";
import { Request, Response } from "express";

export const checkAuth = (req: Request & { user?: UserDb }, res: Response) => {
  if (!req?.user) {
    res.status(401).json({ message: "UNAUTHORIZED" });
    return false;
  }
  return true;
};
