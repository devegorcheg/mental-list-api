import { Schema, model, ObjectId } from "mongoose";

interface TaskDb {
  _id: ObjectId;
  title: string;
  description: string;
  priority: ObjectId;
  owner: ObjectId;
  dueDate: Date;
  done: boolean;
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

export const Tasks = model<TaskDb>("Tasks", taskSchema);
