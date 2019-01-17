describe("Adding comment with server", () => {
  it("Adds it to a list", () => {
    cy.visit("http://localhost:3000");
    const randomText = `${Math.random()} Hello World`;
    cy.getByLabelText("New comment").type(randomText);
    cy.getByText("Add Me").click();
    cy.getByText(randomText);
  });
});
