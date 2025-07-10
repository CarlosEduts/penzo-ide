import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

export interface IUserDocument extends IUser, Document {
  generateAuthToken(): Promise<string>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<IUserDocument | null>;
}
