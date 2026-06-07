import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class RecitalPerformance {
  studentId!: string;
  pieceName!: string;
  composer!: string;
  duration!: number; // in minutes
  orderNumber!: number; // Position in program
}

export class Recital {
  _id?: Types.ObjectId;

  @prop({ required: true })
  eventName!: string;

  @prop({ required: true })
  eventDate!: Date;

  @prop({ default: null })
  eventTime?: string; // e.g., "2:00 PM"

  @prop({ default: null })
  venue?: string;

  @prop({ default: null })
  address?: string;

  @prop({ default: "planning" })
  status!: "planning" | "confirmed" | "completed" | "cancelled";

  @prop({ default: null })
  description?: string;

  @prop({ type: () => Object, default: [] })
  performances?: RecitalPerformance[];

  @prop({ type: () => String, default: [] })
  invitedParentEmails?: string[];

  @prop({ type: () => Object, default: {} })
  parentAttendance?: Record<string, boolean>; // email -> true/false

  @prop({ default: null })
  programNotes?: string;

  @prop({ type: () => String, default: [] })
  attachedDocuments?: string[]; // File URLs for program, posters, etc.

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const RecitalModel = getModelForClass(Recital, {
  options: {
    allowDiscriminators: true,
  },
});
