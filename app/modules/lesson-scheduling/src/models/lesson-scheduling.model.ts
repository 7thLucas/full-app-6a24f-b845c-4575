import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class LessonSchedule {
  _id?: Types.ObjectId;

  @prop({ required: true })
  instructorId!: string;

  @prop({ required: true })
  studentId!: string;

  @prop({ required: true })
  dayOfWeek!: number; // 0-6 (Sunday-Saturday)

  @prop({ required: true })
  startTime!: string; // "14:00" format

  @prop({ required: true })
  endTime!: string;

  @prop({ required: true })
  instrumentType!: string;

  @prop({ default: "active" })
  status!: "active" | "paused" | "cancelled";

  @prop({ type: () => Date })
  startDate?: Date;

  @prop({ type: () => Date })
  endDate?: Date;

  @prop({ type: () => String, default: [] })
  exceptions?: string[]; // Dates (YYYY-MM-DD) when lesson is cancelled

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const LessonScheduleModel = getModelForClass(LessonSchedule, {
  options: {
    allowDiscriminators: true,
  },
});
