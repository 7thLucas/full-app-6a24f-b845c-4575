import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Lesson {
  _id?: Types.ObjectId;

  @prop({ required: true })
  instructorId!: string;

  @prop({ required: true })
  studentId!: string;

  @prop({ required: true })
  instrumentType!: string; // e.g., "Piano", "Violin", "Guitar"

  @prop({ required: true })
  startTime!: Date;

  @prop({ required: true })
  endTime!: Date;

  @prop({ default: "scheduled" })
  status!: "scheduled" | "completed" | "cancelled" | "rescheduled";

  @prop({ default: null })
  notes?: string;

  @prop({ default: null })
  progressNotes?: string;

  @prop({ default: true })
  isRecurring?: boolean;

  @prop({ default: null })
  recurrencePattern?: string; // e.g., "weekly", "biweekly"

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const LessonModel = getModelForClass(Lesson, {
  options: {
    allowDiscriminators: true,
  },
});
