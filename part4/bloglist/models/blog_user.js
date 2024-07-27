
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true},
    name: String,
    passwordHash: String,
    blogPosts: [{type: Schema.Types.ObjectId, ref: "Blog"}],
  },
  {
    collection: process.env.NODE_ENV === "test" ? "testUsers" : "users",
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

const User = model("User", userSchema);

export {User};
