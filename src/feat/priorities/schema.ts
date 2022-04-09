import { Schema, model, ObjectId } from "mongoose";

interface PriorityDb {
  _id: ObjectId;
  title: string;
  color: string;
  priority: number;
  owner: ObjectId;
}

const prioritySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Priorities = model<PriorityDb>("Priorities", prioritySchema);
