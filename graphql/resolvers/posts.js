const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: 1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    post: async (parent, { postId }, context, info) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getPostsByUser: async (parent, { username }, context) => {
      try {
        const posts = await Post.find({ username });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (parent, { body }, context, info) => {
      // Only create post if user is authenticated
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        username: user.username,
        user: user.id,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    deletePost: async (parent, { postId }, context, info) => {
      // Can delete post only if user is authenticated
      // And if post is made by user
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
