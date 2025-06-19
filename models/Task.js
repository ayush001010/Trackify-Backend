import mongoose, { Types } from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model("Task", taskSchema);
export default Task;
