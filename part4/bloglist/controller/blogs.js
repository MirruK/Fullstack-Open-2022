import { Router } from "express";
import { Blog } from "../models/blog_posts.js";
import { User } from "../models/blog_user.js";
import { logger } from "../utils/logger.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

// Will be registered on the path /api/blogs
const blogRouter = Router();

function getTokenFrom(request) {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}

blogRouter.get("/", async (request, response) => {
  logger.info("Incomming GET request to /api/blogs");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.status(200);
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  logger.info("Incomming POST request to /api/blogs");
  // TODO: Do this part in a middleware and register it ex. 4-20
  const decodedToken = verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const data = request.body;
  const user = await User.findById(decodedToken.id);
  const blogContents = {
    title: data.title,
    author: data.author,
    likes: data.likes,
    user: user._id,
  };
  const blog = new Blog(blogContents);
  const result = await blog.save();
  user.blogPosts = user.blogPosts.concat(result._id);
  const updatedUser = await user.save();
  logger.info("Created blogpost and updated user: ", updatedUser);
  response.status(201).json(result);
});

// TODO: Only allow deleting blog posts if you are the creator
blogRouter.delete("/:id", async (request, response) => {
  logger.info(`Incomming DELETE request to /api/blogs/${request.params.id}`);
  const postToDelete = await Blog.deleteOne({ _id: request.params.id });
  response.status(204).json(postToDelete);
});

blogRouter.put("/:id", async (request, response) => {
  // TODO: Validate updated fields
  logger.info(`Incomming PUT request to /api/blogs/${request.params.id}`);
  const postToUpdate = await Blog.findOne({ _id: request.params.id });
  // logger.info("request body: ", request.body);
  // logger.info("matching doc: ", postToUpdate);
  for (const [key, value] of Object.entries(request.body)) {
    if (postToUpdate[key]) {
      postToUpdate[key] = value;
    }
  }
  //logger.info("modified doc: ", postToUpdate);
  await postToUpdate.save();
  response.status(200).end();
});

export { blogRouter };
