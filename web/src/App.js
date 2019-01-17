import React, { Component } from "react";
import { ApolloProvider, Mutation, Query } from "react-apollo";
import "./App.css";
import { client } from "./client";
import gql from "graphql-tag";

const GET_COMMENTS = gql`
  {
    comments {
      text
    }
  }
`;
const ADD_COMMENT = gql`
  mutation addComment($text: String!) {
    addComment(text: $text) {
      text
    }
  }
`;
class App extends Component {
  state = { text: "" };
  changeText = e => {
    this.setState({ text: e.target.value });
  };
  addComment = (mutate, comment) => {
    const optimisticUiConfig = {
      optimisticResponse: {
        __typename: "Mutation",
        addComment: {
          __typename: "Comment",
          text: comment
        }
      },

      update: (proxy, { data: { addComment } }) => {
        const data = proxy.readQuery({ query: GET_COMMENTS });
        data.comments.push(addComment);
        proxy.writeQuery({ query: GET_COMMENTS, data });
      }
    };
    mutate({ variables: { text: this.state.text }, ...optimisticUiConfig });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Mutation mutation={ADD_COMMENT}>
            {mutate => {
              return (
                <div>
                  <label htmlFor="text">New comment</label>
                  <input
                    name="text"
                    id="text"
                    onChange={this.changeText}
                  />{" "}
                  <button
                    onClick={() => {
                      this.addComment(mutate, this.state.text)
                    }}
                  >
                    Add Me
                  </button>
                </div>
              );
            }}
          </Mutation>
          <Query query={GET_COMMENTS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading";
              if (error) return `Error! ${error.message}`;
              return (
                <ul>
                  {data.comments.map(comment => (
                    <li>{comment.text}</li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
