import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { blogRouter } from "./controller/routes";
import "./utils/logger";

config();

const app = express();

const mongoUrl = process.env.MONGO_URI;
connect(mongoUrl);

app.use(cors());
app.use(json());
app.use("/api", blogRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
