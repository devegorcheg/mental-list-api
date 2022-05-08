import mongoose from "mongoose";

import { logger } from "lib/logger";
import { User } from "feat/user";
import { Priorities } from "feat/priorities";
import { Tasks } from "feat/tasks";

export const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL!);
  logger.info("Connected to mongoose");

  return mongoose;
};

export const db = {
  User,
  Priorities,
  Tasks,
};

export type Db = typeof db;
