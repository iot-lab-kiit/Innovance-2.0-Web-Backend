import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: String,
  age: String,
  gender: String,
  preferences: {
    movies: {
      language: String,
      genre: String,
    },
    music: {
      language: String,
      genre: String,
    },
    articles: {
      language: String,
      topic: String,
    },
  },
  musicPrompts: {
    type: [mongoose.Schema.Types.ObjectId],
    references: "musicSchema",
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("User", userSchema);
