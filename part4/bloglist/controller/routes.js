import { Router } from "express";
import { Blog } from "../models/blog_post.js";
import { logger } from "../utils/logger.js";

const blogRouter = Router();

blogRouter.get("/blogs", async (request, response) => {
  logger.info("Incomming GET request to /api/blogs");
  const blogs = await Blog.find({});
  response.status(200);
  response.json(blogs);
});

blogRouter.post("/blogs", async (request, response) => {
  logger.info("Incomming POST request to /api/blogs");
  const blog = new Blog(request.body);
  const validationErr = blog.validateSync();
  if (validationErr) {
    response.status(400).json(validationErr).end();
    return;
  }
  const result = await blog.save();
  response.status(201).json(result);
});

// TODO: Test delete
blogRouter.delete("/blogs/:id", async (request, response) => {
  logger.info(`Incomming DELETE request to /api/blogs/${request.params.id}`);
  const postToDelete = await Blog.deleteOne({ _id: request.params.id });
  response.status(204).json(postToDelete);
});

// TODO: Exercise 4-14: PUT request to update blogPosts, (update blogPost likes)

export { blogRouter };
