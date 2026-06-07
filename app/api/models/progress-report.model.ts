import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class ProgressReport {
  _id?: Types.ObjectId;

  @prop({ required: true })
  studentId!: string;

  @prop({ required: true })
  instructorId!: string;

  @prop({ required: true })
  reportDate!: Date;

  @prop({ default: "" })
  overallProgress!: string; // e.g., "Excellent", "Good", "Needs Improvement"

  @prop({ default: "" })
  skillsAchieved!: string;

  @prop({ default: "" })
  areasForImprovement!: string;

  @prop({ default: "" })
  recommendations!: string;

  @prop({ default: "" })
  practiceNotes!: string; // Notes on student's practice habits

  @prop({ type: () => String, default: [] })
  attachedDocuments?: string[]; // File URLs

  @prop({ default: false })
  sharedWithParent?: boolean;

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const ProgressReportModel = getModelForClass(ProgressReport, {
  options: {
    allowDiscriminators: true,
  },
});
