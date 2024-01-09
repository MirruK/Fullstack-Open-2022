import { Router } from "express";
import { Blog } from "../models/blogPost.js";
import { logger } from "../utils/logger.js";

const blogRouter = Router();

blogRouter.get("/blogs", (request, response) => {
  logger.info("Incomming GET request to /api/blogs");
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/blogs", (request, response) => {
  logger.info("Incomming POST request to /api/blogs");
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export { blogRouter };
