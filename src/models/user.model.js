import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      type: {
        type: Array,
      },
    },
  );

  UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        type: this.type
      },
      process.env.SECRET_KEY
    );
    return token;
  };

  const User = mongoose.model("users", UserSchema);
  export default User;
