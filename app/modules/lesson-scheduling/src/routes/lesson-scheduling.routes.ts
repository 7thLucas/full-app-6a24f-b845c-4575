import { Router } from "express";
import lessonSchedulingController from "../controllers/lesson-scheduling.controller";

const router = Router();

router.use("/", lessonSchedulingController);

export default router;
