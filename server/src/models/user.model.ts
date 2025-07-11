import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserDocument, IUserModel } from "../interfaces/IUser";

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 30, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, collection: "users" }
);

// Método que irá fazer o 'hash' da senha antes de salvar o modelo da classe 'User'
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Método que irá gerar uma autenticação auth para o 'User'
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    "secret",
    { expiresIn: "14d" }
  );
  this.tokens = this.tokens.concat({ token });

  await this.save();
  return token;
};

// Método que irá fazer uma pesquisa por um 'user' através do 'email' e 'password'
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("Usuário ou senha inválidos.");
  }

  const isPasswordMath = await bcrypt.compare(password, user.password);
  if (!isPasswordMath) {
    throw new Error("Usuário ou senha inválidos.");
  }

  return user;
};

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;
