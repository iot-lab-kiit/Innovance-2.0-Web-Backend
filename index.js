import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./src/routes/user.js";
// import movieRoutes from "./src/routes/music.js";
// import articleRoutes from "./src/routes/article.js";
import musicRoutes from "./src/routes/music.js";
import fileRoutes from "./src/routes/file.js";
import cors from "cors";
import compression from "compression";
dotenv.config();

const app = express();

const corsConfig = {
  credentials: "true",
  origin: "http://localhost:3000",
  optionSuccessStatus: "200",
};

app.use(compression());
app.use(cors(corsConfig));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRoutes);
app.use("/music", musicRoutes);
app.use("/upload", fileRoutes);

app.use("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API working fine ",
    statusCode: 200,
  });
});

const PORT = process.env.PORT || 3300;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
