import express from "express";
import Task from "../models/Task.js";
const route = express.Router();

// To add task
route.post("/task", async (req, res) => {
  try {
    const { title, description, completed, createdAt } = req.body;

    const newTask = new Task({ title, description, completed, createdAt }); // insert() ..?
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
route.get("/tasks", async (req, res) => {
  try {
    const allTask = await Task.find().sort({ createdAt: -1 }); // find()

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
route.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId); // findById()
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
route.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id; //from url
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      // findBIdAndUpdate
      new: true, // returns the updated document
      runValidators: true, // optional: ensure schema validation
    });

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
route.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await Task.findByIdAndDelete(taskId);
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