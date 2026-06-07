import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class Student {
  _id?: Types.ObjectId;

  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true })
  email!: string;

  @prop({ default: null })
  parentEmail?: string;

  @prop({ default: null })
  parentPhone?: string;

  @prop({ required: true })
  instrumentType!: string; // e.g., "Piano", "Violin", "Guitar"

  @prop({ default: "active" })
  status!: "active" | "inactive" | "graduated";

  @prop({ type: () => Date })
  enrollmentDate?: Date;

  @prop({ type: () => String, default: [] })
  assignedInstructors?: string[]; // Array of instructor IDs

  @prop({ type: () => String, default: [] })
  skillsMastered?: string[]; // e.g., ["scales", "major keys", "Bach pieces"]

  @prop({ type: () => String, default: [] })
  piecesLearned?: string[]; // e.g., ["Moonlight Sonata", "Für Elise"]

  @prop({ default: null })
  notes?: string;

  @prop({ type: () => Date })
  createdAt?: Date;

  @prop({ type: () => Date })
  updatedAt?: Date;
}

export const StudentModel = getModelForClass(Student, {
  options: {
    allowDiscriminators: true,
  },
});
