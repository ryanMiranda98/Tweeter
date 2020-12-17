// Import dependency packages
const dotenv = require("dotenv");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// Import modules
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Setup config file
dotenv.config(path.resolve(__dirname, ".env"));

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
  context: ({req}) => ({req})
});
server.listen(5000, () => {
  console.log("Server running at port 5000");
});
