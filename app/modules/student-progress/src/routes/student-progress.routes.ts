import { Router } from "express";
import studentProgressController from "../controllers/student-progress.controller";

const router = Router();

router.use("/", studentProgressController);

export default router;
