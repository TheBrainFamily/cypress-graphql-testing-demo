describe("Adding comment", () => {
  it("adds a comment", () => {
    cy.visit("http://localhost:3000");
    const randomText = `${Math.random()} Hello World`;
    cy.getByLabelText("New comment").type(randomText);
    cy.getByText("Add Me").click();
    cy.getByText(randomText);
  });
});
