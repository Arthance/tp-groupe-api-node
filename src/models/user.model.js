import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      surname: {
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
        required: true,
      },
      linkedin: {
        type: String,
        required: true,
      },
      userType: {
        type: Array,
        required: true,
      },
    },
  );

  UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
      },
      process.env.SECRET_KEY
    );
    return token;
  };

  const User = mongoose.model("users", UserSchema);
  export default User;