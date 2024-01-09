import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { blogRouter } from "./controller/routes.js";
import { logger } from "./utils/logger.js";

config();

const app = express();

const mongoUrl = process.env.MONGODB_URI;
connect(mongoUrl);

app.use(express.json());
app.use(cors());
// Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src '*'");
  next();
});

app.use("/api/", blogRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
