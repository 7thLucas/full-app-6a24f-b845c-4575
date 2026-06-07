import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class RecitalPerformanceItem {
  @prop({ required: true })
  studentId!: string;

  @prop({ required: true })
  pieceName!: string;

  @prop({ default: "" })
  composer!: string;

  @prop({ default: 5 })
  estimatedDuration!: number; // in minutes

  @prop({ default: 0 })
  performanceOrder!: number; // Position in program (1-indexed)
}

export class RecitalEvent {
  _id?: Types.ObjectId;

  @prop({ required: true })
  eventName!: string;

  @prop({ required: true })
  eventDate!: Date;

  @prop({ default: null })
  eventTime?: string; // e.g., "14:00"

  @prop({ default: null })
  venue?: string;

  @prop({ default: null })
  address?: string;

  @prop({ default: "planning" })
  status!: "planning" | "confirmed" | "in_progress" | "completed" | "cancelled";

  @prop({ default: "" })
  description!: string;

  @prop({ type: () => RecitalPerformanceItem, default: [] })
  performances?: RecitalPerformanceItem[];

  @prop({ type: () => String, default: [] })
  invitedParentEmails?: string[];

  @prop({ type: () => Object, default: {} })
  parentAttendance?: Record<string, boolean>; // email -> confirmed/not confirmed

  @prop({ default: "" })
  programNotes!: string;

  @prop({ type: () => String, default: [] })
  attachments?: string[]; // File URLs

  @prop({ default: null })
  createdBy?: string; // User ID who created the event

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const RecitalEventModel = getModelForClass(RecitalEvent, {
  options: {
    allowDiscriminators: true,
  },
});
