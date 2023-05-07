import { Router } from "express";
import { Types } from "mongoose";

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

  const { sort, filter } = req.query;
  const userId = req?.user?._id ?? "";
  const $match: Record<string, unknown> = { owner: userId };
  const sortParam = sort === "asc" ? -1 : 1;

  if (filter) {
    $match.priority = new Types.ObjectId(filter as string);
  }

  try {
    const tasks = await db.Tasks.aggregate([
      { $match },
      {
        $lookup: {
          from: "priorities",
          localField: "priority",
          foreignField: "_id",
          as: "priorityDoc",
        },
      },
      { $unwind: "$priorityDoc" },
      {
        $project: {
          title: 1,
          description: 1,
          priority: 1,
          priorityDoc: 1,
          owner: 1,
          dueDate: 1,
          done: 1,
          date: {
            $dateToParts: { date: "$dueDate" },
          },
        },
      },
      {
        $sort: {
          "date.year": 1,
          "date.month": 1,
          "date.day": 1,
          "priorityDoc.priority": sortParam,
          "date.hour": 1,
          "date.minute": 1,
          _id: -1,
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          priority: 1,
          owner: 1,
          dueDate: 1,
          done: 1,
        },
      },
    ]);

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
    const newTask = await db.Tasks.create({
      ...task,
      owner: userId,
    });

    return res.status(200).json(newTask);
  } catch (error) {
    return res.status(400).json({
      message: "BAD_REQUEST",
    });
  }
});
