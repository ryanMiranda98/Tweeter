// Import dependency packages
const dotenv = require("dotenv");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

// Import modules
const Post = require("./models/Post");

// Setup config file
dotenv.config(path.resolve(__dirname, ".env"));

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dvkjf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Connect to server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen(5000, () => {
  console.log("Server running at port 5000");
});
