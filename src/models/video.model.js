import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    cours: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ordre: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Video = mongoose.model("courses", VideoSchema);
export default Video;