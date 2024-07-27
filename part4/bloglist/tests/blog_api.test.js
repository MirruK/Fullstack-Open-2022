import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../index.js";
import { Blog } from "../models/blog_posts.js";
import { hash } from "bcrypt";
import { User } from "../models/blog_user.js";

const api = supertest(app);

const initialPosts = [
  {
    title: "title1",
    author: "author1",
    url: "url1",
    likes: 1,
  },
  {
    title: "title2",
    author: "author2",
    url: "url2",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let post of initialPosts) {
    const postObject = Blog(post);
    await postObject.save();
  }
});

describe("Testing GET functionality", () => {
  test("Blog posts are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Blog posts have a defined 'id'-field", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.every((b) => b.id)).toBe(true);
  });

  test("There are two saved blog posts", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const contents = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(initialPosts.length);
    expect(contents).toContain("title1");
  });
});

describe("Testing POST functionality", () => {
  test("Creating a post finishes successfully", async () => {
    const newBlogpost = {
      title: "test POST",
      author: "POSTer",
      url: "post.post",
      likes: 1,
    };
    await api
      .post("/api/blogs")
      .send(newBlogpost)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    const titles = response.body.map((bp) => bp.title);
    // Ensure number of posts is greater than initially
    expect(response.body).toHaveLength(initialPosts.length + 1);
    // Ensure the added post has the correct title
    expect(titles).toContain("test POST");
  });

  test("Posts created with undefined likes default to zero likes", async () => {
    const newBlogpost = {
      title: "test POST",
      author: "POSTer",
      url: "post.post",
    };
    await api
      .post("/api/blogs")
      .send(newBlogpost)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    // Ensure number of posts is greater than initially
    expect(response.body).toHaveLength(initialPosts.length + 1);
    // Ensure all posts have a defined "likes" property
    expect(response.body.every((bp) => bp.likes !== undefined)).toBe(true);
  });

  test("Creating a post without all required fields returns status code 400", async () => {
    const newBlogpost = {
      title: "test POST",
      url: "post.post",
      likes: 100,
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlogpost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Testing DELETE and PUT functionality", () => {
  test("Deleting a post by id removes it from the db", async () => {
    const initialBlogs = (await Blog.find({}));
    const blogToDelete = initialBlogs[0].id;
    console.log("Id of found post: ", blogToDelete);
    const response = await api
      .delete(`/api/blogs/${blogToDelete}`)
      .expect(204);
    
    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )
    const ids = blogsAtEnd.map(r => r.id)
    expect(ids).not.toContain(blogToDelete);
  });
  test("Blogpost fields can be updated using a PUT request", async () => {
    const initialBlogs = await Blog.find({});
    const blogToUpdate = initialBlogs[0].id;
    console.log("Id of found post: ", blogToUpdate);
    const response = await api
      .put(`/api/blogs/${blogToUpdate}`)
      .send({title: "modified title"})
      .expect(200);
    const blogsAtEnd = await Blog.find({});
    const titles = blogsAtEnd.map(r => r.title);
    expect(titles).toContain("modified title");
  });
});

const initialUsers = [
  {
    username: "user1",
    name: "user1",
    password: await hash("testSecret", 10),
    posts: [],
  },
  {
    username: "user2",
    name: "user2",
    password: await hash("testSecret", 10),
    posts: [],
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (let user of initialUsers) {
    const userObject = User(user);
    await userObject.save();
  }
});

describe("Testing users GET functionality", () => {
  test("User data is returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Users have a defined 'id'-field", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.every((b) => b.id)).toBe(true);
  });

  test("There are two saved users", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const contents = response.body.map((r) => r.username);
    expect(response.body).toHaveLength(initialUsers.length);
    expect(contents).toContain("user1");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});