import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import "express-async-errors";
import { blogRouter } from "./controller/routes.js";
import { logger } from "./utils/logger.js";
import { PORT, MONGODB_URI } from "./utils/environment.js";

const app = express();

connect(MONGODB_URI);

app.use(express.json());
app.use(cors());

app.use("/api/", blogRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export { app };
