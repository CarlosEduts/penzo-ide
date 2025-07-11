import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  isPublic: boolean;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
}
