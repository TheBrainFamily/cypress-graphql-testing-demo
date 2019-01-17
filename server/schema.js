const gql = a => a;
module.exports = gql`
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
