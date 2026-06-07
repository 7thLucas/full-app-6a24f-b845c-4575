import { Router, Request, Response } from "express";
import { LessonScheduleModel } from "../models/lesson-scheduling.model";
import { successResponse, errorResponse } from "~/lib/api-response";

const router = Router();

// GET all lesson schedules
router.get("/", async (req: Request, res: Response) => {
  try {
    const schedules = await LessonScheduleModel.find({});
    return res.json(successResponse(schedules));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch schedules"));
  }
});

// GET lesson schedules for a specific instructor
router.get("/instructor/:instructorId", async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const schedules = await LessonScheduleModel.find({ instructorId });
    return res.json(successResponse(schedules));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch instructor schedules"));
  }
});

// GET lesson schedules for a specific student
router.get("/student/:studentId", async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const schedules = await LessonScheduleModel.find({ studentId });
    return res.json(successResponse(schedules));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch student schedules"));
  }
});

// CREATE a new lesson schedule
router.post("/", async (req: Request, res: Response) => {
  try {
    const { instructorId, studentId, dayOfWeek, startTime, endTime, instrumentType } = req.body;

    if (!instructorId || !studentId || dayOfWeek === undefined || !startTime || !endTime || !instrumentType) {
      return res.status(400).json(errorResponse("Missing required fields"));
    }

    const newSchedule = new LessonScheduleModel({
      instructorId,
      studentId,
      dayOfWeek,
      startTime,
      endTime,
      instrumentType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newSchedule.save();
    return res.status(201).json(successResponse(newSchedule));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to create schedule"));
  }
});

// UPDATE a lesson schedule
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    const schedule = await LessonScheduleModel.findByIdAndUpdate(id, updates, { new: true });

    if (!schedule) {
      return res.status(404).json(errorResponse("Schedule not found"));
    }

    return res.json(successResponse(schedule));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to update schedule"));
  }
});

// DELETE a lesson schedule
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await LessonScheduleModel.findByIdAndDelete(id);

    if (!schedule) {
      return res.status(404).json(errorResponse("Schedule not found"));
    }

    return res.json(successResponse({ message: "Schedule deleted successfully" }));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete schedule"));
  }
});

export default router;
