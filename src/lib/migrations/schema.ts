import { Schema, model, Document } from "mongoose";

const migrationSchema = new Schema({
  data: {
    type: Object,
  },
});

export const Migration = model<{ data: any } & Document>(
  "Migration",
  migrationSchema,
);
