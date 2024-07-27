import { Router } from "express";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { User } from "../models/blog_user.js";
import { compare } from "bcrypt";

const loginRouter = Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const matchingUser = await User.findOne({ username: username });
  const passwordCorrect =
    matchingUser === null
      ? false
      : await compare(password, matchingUser.passwordHash);
  if (!(matchingUser && passwordCorrect)) {
    return response.status(401).json({ error: "Invalid username or password" });
  }
  const userForToken = {
    username: matchingUser.username,
    id: matchingUser._id,
  };
  const token = sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: matchingUser.username, name: matchingUser.name });
});

export { loginRouter };
