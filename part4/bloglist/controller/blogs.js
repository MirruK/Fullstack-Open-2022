import { Router } from "express";
import { Blog } from "../models/blog_posts.js";
import { User } from "../models/blog_user.js";
import { logger } from "../utils/logger.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

// Will be registered on the path /api/blogs
const blogRouter = Router();

blogRouter.get("/", async (request, response) => {
  logger.info("Incomming GET request to /api/blogs");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.status(200);
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  logger.info(
    "Incomming POST request to /api/blogs with token: ",
    request.token,
  );
  let decodedToken;
  try {
    decodedToken = verify(request.token, process.env.SECRET);
  } catch (e) {
    logger.error("Unexpected error during token verification:", e);
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const data = request.body;
  const user = await User.findById(decodedToken.id);
  if (![data.title, data.author].every((v) => !!v)) {
    response
      .status(400)
      .json({ error: "Bad request: all required fields not provided" });
  }
  const blogContents = {
    title: data.title,
    author: data.author,
    // Default the undefined likes to 0
    likes: data.likes ? data.likes : 0,
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
  let decodedToken;
  try {
    decodedToken = verify(request.token, process.env.SECRET);
  } catch (e) {
    logger.error("Unexpected error during token verification:", e);
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  logger.info(`Incomming DELETE request to /api/blogs/${request.params.id}`);

  const postToDelete = await Blog.findById(request.params.id);
  if (!postToDelete) {
    return response.status(404).json({ error: "blog post not found" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user || postToDelete.author !== user.username) {
    return response.status(403).json({ error: "forbidden: not the author" });
  }

  await Blog.deleteOne({ _id: request.params.id });
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  let decodedToken;
  try {
    decodedToken = verify(request.token, process.env.SECRET);
  } catch (e) {
    logger.error("Unexpected error during token verification:", e);
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  logger.info(`Incomming PUT request to /api/blogs/${request.params.id}`);
  const postToUpdate = await Blog.findOne({ _id: request.params.id });

  const user = await User.findById(decodedToken.id);
  if (!user || postToUpdate.author !== user.username) {
    return response.status(403).json({ error: "forbidden: not the author" });
  }

  // TODO: Validate updated fields
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
