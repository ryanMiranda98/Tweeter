const postResolvers = require("./posts");
const usersResolvers = require("./users");
const commentResolvers = require("./comment");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
