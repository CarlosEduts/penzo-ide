import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/IProject";

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    codeHtml: { type: String, default: "" },
    codeCss: { type: String, default: "" },
    codeJs: { type: String, default: "" },
    isPublic: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
