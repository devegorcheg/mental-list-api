import { Router } from "express";
import { Types } from "mongoose";

// utils
import { db } from "lib/db";
import { checkAuth } from "utils/errors";

// types
import { Request } from "express";
import { UserDb } from "feat/user/schema";

export const router = Router({ mergeParams: true });

router.get("/:id", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const { id: userId } = req.params;

  try {
    const priorities = await db.Priorities.find({
      owner: new Types.ObjectId(userId),
    })
      .lean()
      .exec();
    return res.status(200).json(priorities);
  } catch {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});
