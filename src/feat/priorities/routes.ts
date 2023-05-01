import { Router } from "express";
import { Types } from "mongoose";

// utils
import { db } from "lib/db";
import { checkAuth } from "utils/errors";

// types
import { Request } from "express";
import { UserDb } from "feat/user/schema";

export const router = Router({ mergeParams: true });

// get all priorities of user
router.get("/", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const userId = req?.user?._id ?? "";

  try {
    const priorities = await db.Priorities.find({
      owner: userId,
    })
      .sort({ priority: -1, _id: -1 })
      .lean()
      .exec();
    return res.status(200).json(priorities);
  } catch {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});

// get all priorities by id
router.get("/:id", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const userId = req?.user?._id ?? "";
  const { id: priorityId } = req.params;

  try {
    const priorities = await db.Priorities.find({
      _id: new Types.ObjectId(priorityId),
      owner: userId,
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

// create new priority
router.post("/", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const priority = req.body;
  const userId = req?.user?._id ?? "";

  try {
    const newPriority = await db.Priorities.create({
      ...priority,
      owner: userId,
    });

    return res.status(200).json(newPriority);
  } catch (error) {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});
