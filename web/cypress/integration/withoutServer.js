import { mockGraphqlWithResolvers } from "../helpers/mockGraphqlWithResolvers";
import { slowDownMutations } from "../helpers/slowDownMutations";

function addComment(text) {
  cy.getByLabelText("New comment").type(text);
  cy.getByText("Add Me").click();
}

it("Loading comments from the server", () => {
  let text = "Beautiful comment";
  const resolvers = {
    Query: { comments: () => [{ text }] }
  };

  cy.visit("/", mockGraphqlWithResolvers(resolvers));

  cy.getByText(text);
});

describe("Adding comments without server", () => {
  it("adds it to the list with the value returned from the mutation result", () => {
    const resolvers = {
      Mutation: {
        addComment: () => ({
          text: "Respects the return from the Server!"
        })
      }
    };

    cy.visit("/", mockGraphqlWithResolvers(resolvers));

    addComment("New");

    cy.getByText("Respects the return from the Server!");
  });
  it("Uses optimistic UI to show the new todo name before mutation returns", function() {
    cy.visit("/", mockGraphqlWithResolvers(slowDownMutations(["addComment"])));

    addComment("New");

    cy.getByText("New");
  });
});
