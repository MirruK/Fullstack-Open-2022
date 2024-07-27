import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: String,
    likes: { type: Number, default: 0 },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    collection: process.env.NODE_ENV === "test" ? "testBlogPosts" : "blogPosts",
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Blog = model("Blog", blogSchema);

export { Blog };
