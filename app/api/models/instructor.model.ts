import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Instructor {
  _id?: Types.ObjectId;

  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true })
  email!: string;

  @prop({ default: null })
  phone?: string;

  @prop({ type: () => String, default: [] })
  specializations!: string[]; // e.g., ["Piano", "Music Theory"]

  @prop({ default: "active" })
  status!: "active" | "inactive";

  @prop({ default: null })
  bio?: string;

  @prop({ type: () => Object, default: {} })
  availableTimeSlots?: Record<string, string[]>; // day -> ["09:00", "10:00", "11:00"]

  @prop({ type: () => String, default: [] })
  studentIds?: string[];

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const InstructorModel = getModelForClass(Instructor, {
  options: {
    allowDiscriminators: true,
  },
});
