import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true, // ✅ typo fix: require → required
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // ✅ ADD THIS FIELD
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
