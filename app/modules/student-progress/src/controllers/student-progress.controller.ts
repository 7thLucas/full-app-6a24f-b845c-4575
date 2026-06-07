import { Router, Request, Response } from "express";
import { StudentProgressLogModel } from "../models/student-progress.model";
import { successResponse, errorResponse } from "~/lib/api-response";

const router = Router();

// GET all progress logs
router.get("/", async (req: Request, res: Response) => {
  try {
    const logs = await StudentProgressLogModel.find({}).sort({ logDate: -1 });
    return res.json(successResponse(logs));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch progress logs"));
  }
});

// GET progress logs for a specific student
router.get("/student/:studentId", async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const logs = await StudentProgressLogModel.find({ studentId }).sort({ logDate: -1 });
    return res.json(successResponse(logs));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch student progress logs"));
  }
});

// GET progress logs by instructor
router.get("/instructor/:instructorId", async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const logs = await StudentProgressLogModel.find({ instructorId }).sort({ logDate: -1 });
    return res.json(successResponse(logs));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch instructor progress logs"));
  }
});

// CREATE a new progress log
router.post("/", async (req: Request, res: Response) => {
  try {
    const { studentId, instructorId, logDate, lessonFocus, studentPerformance } = req.body;

    if (!studentId || !instructorId || !logDate) {
      return res.status(400).json(errorResponse("Missing required fields"));
    }

    const newLog = new StudentProgressLogModel({
      studentId,
      instructorId,
      logDate,
      lessonFocus,
      studentPerformance,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newLog.save();
    return res.status(201).json(successResponse(newLog));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to create progress log"));
  }
});

// UPDATE a progress log
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    const log = await StudentProgressLogModel.findByIdAndUpdate(id, updates, { new: true });

    if (!log) {
      return res.status(404).json(errorResponse("Progress log not found"));
    }

    return res.json(successResponse(log));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to update progress log"));
  }
});

// DELETE a progress log
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await StudentProgressLogModel.findByIdAndDelete(id);

    if (!log) {
      return res.status(404).json(errorResponse("Progress log not found"));
    }

    return res.json(successResponse({ message: "Progress log deleted successfully" }));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete progress log"));
  }
});

export default router;
