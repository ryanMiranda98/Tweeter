const postResolvers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
