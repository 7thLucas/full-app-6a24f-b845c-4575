import { Router, Request, Response } from "express";
import { RecitalEventModel } from "../models/recital-management.model";
import { successResponse, errorResponse } from "~/lib/api-response";

const router = Router();

// GET all recital events
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await RecitalEventModel.find({}).sort({ eventDate: 1 });
    return res.json(successResponse(events));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch recital events"));
  }
});

// GET a specific recital event
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await RecitalEventModel.findById(id);

    if (!event) {
      return res.status(404).json(errorResponse("Recital event not found"));
    }

    return res.json(successResponse(event));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to fetch recital event"));
  }
});

// CREATE a new recital event
router.post("/", async (req: Request, res: Response) => {
  try {
    const { eventName, eventDate, eventTime, venue, address, createdBy } = req.body;

    if (!eventName || !eventDate) {
      return res.status(400).json(errorResponse("Missing required fields: eventName, eventDate"));
    }

    const newEvent = new RecitalEventModel({
      eventName,
      eventDate,
      eventTime: eventTime || null,
      venue: venue || null,
      address: address || null,
      createdBy: createdBy || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newEvent.save();
    return res.status(201).json(successResponse(newEvent));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to create recital event"));
  }
});

// UPDATE a recital event
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    const event = await RecitalEventModel.findByIdAndUpdate(id, updates, { new: true });

    if (!event) {
      return res.status(404).json(errorResponse("Recital event not found"));
    }

    return res.json(successResponse(event));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to update recital event"));
  }
});

// DELETE a recital event
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await RecitalEventModel.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json(errorResponse("Recital event not found"));
    }

    return res.json(successResponse({ message: "Recital event deleted successfully" }));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete recital event"));
  }
});

// ADD a student performance to a recital
router.post("/:id/performance", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { studentId, pieceName, composer, estimatedDuration } = req.body;

    if (!studentId || !pieceName) {
      return res.status(400).json(errorResponse("Missing required fields: studentId, pieceName"));
    }

    const event = await RecitalEventModel.findById(id);

    if (!event) {
      return res.status(404).json(errorResponse("Recital event not found"));
    }

    const newPerformance = {
      studentId,
      pieceName,
      composer: composer || "",
      estimatedDuration: estimatedDuration || 5,
      performanceOrder: (event.performances?.length || 0) + 1,
    };

    event.performances = event.performances || [];
    event.performances.push(newPerformance);
    event.updatedAt = new Date();

    await event.save();
    return res.json(successResponse(event));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add performance"));
  }
});

// UPDATE parent attendance for a recital
router.put("/:id/attendance", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { parentEmail, attending } = req.body;

    if (!parentEmail || attending === undefined) {
      return res.status(400).json(errorResponse("Missing required fields: parentEmail, attending"));
    }

    const event = await RecitalEventModel.findById(id);

    if (!event) {
      return res.status(404).json(errorResponse("Recital event not found"));
    }

    event.parentAttendance = event.parentAttendance || {};
    event.parentAttendance[parentEmail] = attending;
    event.updatedAt = new Date();

    await event.save();
    return res.json(successResponse(event));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to update attendance"));
  }
});

export default router;
