const { GraphQLServer } = require("graphql-yoga");
const typeDefs = require("./schema");
const comments = [];
const resolvers = {
  Query: {
    comments: _ => comments
  },
  Mutation: {
    addComment: (_, { text }) => {
      const newComment = { text };
      comments.push(newComment);
      return newComment;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({endpoint: "/graphql"}, () => console.log("Server is running on http://localhost:4000"));
