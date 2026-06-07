import { Router } from "express";
import recitalManagementController from "../controllers/recital-management.controller";

const router = Router();

router.use("/", recitalManagementController);

export default router;
