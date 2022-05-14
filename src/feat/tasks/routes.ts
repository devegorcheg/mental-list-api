import { Router } from "express";

// utils
import { db } from "lib/db";
import { checkAuth } from "utils/errors";

// types
import { Request } from "express";
import { UserDb } from "feat/user/schema";

export const router = Router({ mergeParams: true });

// get all tasks of user
router.get("/", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const userId = req?.user?._id ?? "";

  try {
    const tasks = await db.Tasks.find({
      owner: userId,
    })
      .sort({ dueDate: -1, _id: -1 })
      .lean()
      .exec();
    return res.status(200).json(tasks);
  } catch {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});

// create new task
router.post("/", async (req: Request & { user?: UserDb }, res) => {
  if (!checkAuth(req, res)) {
    return;
  }

  const task = req.body;
  const userId = req?.user?._id ?? "";

  try {
    await db.Tasks.create({
      ...task,
      owner: userId,
    });

    const tasks = await db.Tasks.find({
      owner: userId,
    })
      .sort({ dueDate: -1, _id: -1 })
      .lean()
      .exec();

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});
