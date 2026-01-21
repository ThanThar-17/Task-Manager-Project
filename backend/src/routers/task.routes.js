import prisma from "../prismaClient.js";
import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  getMyTasks
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/my-tasks", getMyTasks);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", async (req, res) => {
  try {

    const userId = Number(req.headers["user-id"]);
    const userRole = req.headers["user-role"];

    if (!userId || userRole !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedTask = await prisma.task.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
