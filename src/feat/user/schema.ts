import { Schema, model, Document, ObjectId } from "mongoose";

// utils
import { createdAt, updatedAt } from "lib/schema";

export interface UserDb {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    createdAt,
    updatedAt,
    profile: {
      type: profileSchema,
      required: true,
    },
  },
  // TODO: Пока что strict: false чтобы не описывать всю схему
  { strict: false },
);

export const User = model<UserDb>("User", userSchema);
