import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class StudentProgressLog {
  _id?: Types.ObjectId;

  @prop({ required: true })
  studentId!: string;

  @prop({ required: true })
  instructorId!: string;

  @prop({ required: true })
  logDate!: Date;

  @prop({ default: "" })
  lessonFocus!: string; // What was taught

  @prop({ default: "" })
  studentPerformance!: string; // How student performed

  @prop({ type: () => String, default: [] })
  skillsWorkedOn?: string[];

  @prop({ type: () => String, default: [] })
  skillsMastered?: string[];

  @prop({ default: "" })
  piecesWorkedOn!: string;

  @prop({ default: "" })
  homeWorkAssignment!: string;

  @prop({ default: "" })
  instructorNotes!: string;

  @prop({ default: "" })
  progressLevel!: "excellent" | "good" | "needs_improvement" | ""; // 1-5 scale

  @prop({ type: () => String, default: [] })
  attachments?: string[]; // File URLs

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const StudentProgressLogModel = getModelForClass(StudentProgressLog, {
  options: {
    allowDiscriminators: true,
  },
});
