import mongoose from "mongoose";

import { logger } from "lib/logger";
import { User } from "feat/user";
import { Priorities } from "feat/priorities";

export const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL!);
  logger.info("Connected to mongoose");

  return mongoose;
};

export const db = {
  User,
  Priorities,
};

export type Db = typeof db;
