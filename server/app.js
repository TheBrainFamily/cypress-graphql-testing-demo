const { GraphQLServer } = require("graphql-yoga");
const gql = a => a;
const typeDefs = gql`
  type Query {
    comments: [Comment]
  }
  type Mutation {
    addComment(text: String!): Comment
  }

  type Comment {
    text: String
  }
`;
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
server.start(() => console.log("Server is running on http://localhost:4000"));
