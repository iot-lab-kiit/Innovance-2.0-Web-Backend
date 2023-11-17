import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    references: "userSchema",
    required: true,
  },
  prompt: { type: String },
  result: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Music", musicSchema);
