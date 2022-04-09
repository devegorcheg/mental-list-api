import { Router } from "express";

export const router = Router({ mergeParams: true });

// TODO: remove
router.get("/", async (req, res) => {
  res.json({ user: (req as any).user });
});
