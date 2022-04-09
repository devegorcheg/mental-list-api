import { Schema, model, Document } from "mongoose";

// utils
import { _id, createdAt, updatedAt } from "lib/schema";

interface UserDoc extends Document {
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
    _id,
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

export const User = model<UserDoc>("User", userSchema);
