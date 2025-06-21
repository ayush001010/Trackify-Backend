import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const route = express.Router();

// To add task
route.post("/task", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed, createdAt } = req.body;
    
    const newTask = new Task({
      title,
      description,
      completed,
      createdAt,
      user: req.user.userId,
    }); // insert() ..?
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task Added",
    });
  } catch (error) {
    console.error("Error while creating task:", error.message);
    res.status(400).json({
      success: false,
      message: "Oops.., Something went wrong",
    });
  }
});

// To get all tasks
route.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const allTask = await Task.find({ user: req.user.userId }).sort({
      createdAt: -1,
    }); // find()

    res.status(200).json({
      success: true,
      message: "All tasks fetched successfully",
      data: allTask,
    });
  } catch (error) {
    console.error("Error while fetching tasks:", error.message);
    res.status(500).json({
      success: false,
      message: "Oops.. Something went wrong",
    });
  }
});

// To get single task
route.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }); // findById() ---> findOne()
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error while fetching task by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Oops... Something went wrong",
    });
  }
});

// Update a task by ID
route.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const updateData = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error while updating task:", error.message);
    res.status(500).json({
      success: false,
      message: "Oops... Something went wrong",
    });
  }
});

// Delete the task
route.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    // const taskId = req.params.id;
    // const taskToDelete = await Task.findByIdAndDelete(taskId);
     const taskToDelete = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!taskToDelete) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.error("Error while updating task:", error.message);
    res.status(500).json({
      success: false,
      message: "Oops... Something went wrong",
    });
  }
});

export default route;
