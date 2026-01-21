import {
    createNewTask,
    fetchAllTasks,
    updateTaskStatus,
    getTasksForEmployee
  } from "../services/task.service.js";

  export const createTask = async (req, res) => {
    try {
      const task = await createNewTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const getTasks = async (req, res) => {
    try {
      const tasks = await fetchAllTasks();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const updateTask = async (req, res) => {
    try {
      const user = req.body.user;
      const task = await updateTaskStatus(req.params.id, req.body, user);
      res.json(task);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  export const getMyTasks = async (req, res) => {
    try {
      const userId = Number(req.query.userId);
      const role = req.query.role;
      const department = req.query.department;

      let tasks;
      if (role === "ADMIN") {
        tasks = await fetchAllTasks();
      } else {
        tasks = await getTasksForEmployee(userId, department);
      }

      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


