import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import "express-async-errors";
import { blogRouter } from "./controller/blogs.js";
import { logger } from "./utils/logger.js";
import { PORT, MONGODB_URI } from "./utils/environment.js";
import { userRouter } from "./controller/users.js";
import { loginRouter } from "./controller/login.js";
import { userExtractor, tokenExtractor } from "./middleware/auth_middleware.js";

const app = express();

try {
  await connect(MONGODB_URI);
} catch (err) {
  logger.info("Error while creating mongo connection");
  logger.error(err);
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export { app };
