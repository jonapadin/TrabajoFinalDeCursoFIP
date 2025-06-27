describe("Tests del Home", () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.wait(2000);
  })

  it("debería visitar el home", () => {
    // Aquí puedes verificar algo de la home si quieres
    cy.get('h2').contains("SERVICIOS")
    cy.wait(2000);
  })

  it("debería ir a la página de registro al hacer clic en el botón", () => {
    cy.wait(2000)
    cy.visit('http://localhost:5173/');
    cy.wait(2000)
    cy.get('.btn-primary').click(); // Asegúrate de que esta clase esté en el botón correcto
    cy.url().should('include', 'pages/login/login.html'); // Verifica que se redirige
  });
})