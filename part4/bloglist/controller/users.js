import { Router } from "express";
import { User } from "../models/blog_user.js";
import { logger } from "../utils/logger.js";
import { hash } from "bcrypt";

function validatePassword(password) {
  if (password.length < 3) {
    return false;
  }
  return true;
}

const userRouter = Router();

userRouter.get("/:id", (req, res) => {});

userRouter.get("/", async (request, response) => {
  logger.info("Incomming GET request to /api/users");
  const users = await User.find({}).populate("blogPosts", {
    title: 1,
    author: 1,
    likes: 1,
  });
  response.status(200);
  response.json(users);
});

userRouter.post("/register", async (request, response) => {
  logger.info("Incomming POST request to /api/users/register");
  const { username, name, password } = request.body;
  if (!validatePassword(password)) {
    response
      .status(400)
      .send(
        "Password did not fill the validation requirements, it must be at least 3 characters long"
      );
    return;
  }
  if (![username, name, password].every((v) => !!v)) {
    logger.info("User attempted registering with missing field(s) in body");
    response
      .status(400)
      .send("Invalid register request body, missing field")
      .end();
    return;
  }
  const userDetails = {
    username: username,
    name: name,
    passwordHash: await hash(password, 10),
    posts: [],
  };
  const newUser = new User(userDetails);
  // Mongoose validation does not deal with uniqueness of fields at all
  const validationErr = await newUser.validate();
  let savedUser;
  if (validationErr) {
    response.status(400).json(validationErr).end();
    return;
  }
  try {
    savedUser = await newUser.save();
  } catch (e) {
    logger.info("Mongo Error: ", e.name);
    if (e.code === 11000) {
      response
        .status(400)
        .send("A user with the same username already exists")
        .end();
      return;
    }
  }
  response.status(201).json(savedUser);
});

export { userRouter };
