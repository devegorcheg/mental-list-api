import { Schema, model, Document } from "mongoose";

// utils
import { _id } from "lib/schema";

interface PriorityDoc extends Document {
  _id: string;
  title: string;
  color: string;
  priority: number;
  owner: string;
}

const prioritySchema = new Schema({
  _id,
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    // TODO: set default color
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: String,
    required: true,
  },
});

export const Priorities = model<PriorityDoc>("Priorities", prioritySchema);
