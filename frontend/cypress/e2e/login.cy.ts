describe("Login", () => {
  beforeEach(function () {
    cy.visit("/login");
    cy.fixture("login").as("credenciaisInvalidas");
    cy.fixture("loginCorrect").as("credenciaisValidas");
  });

  it("Login realizado com sucesso!", function () {
    cy.intercept("POST", "/token", {
			statusCode: 200,
		}).as("loginRequest");

	cy.get("input[name='username']").type(this.credenciaisValidas.username);
	cy.get("input[name='password']").type(this.credenciaisValidas.password);
	cy.get("button[type='submit']").click();

  });

   it("Credenciais inválidas!", function () {
    cy.intercept("POST", "/token", {
			statusCode: 401,
      body: { message: "invalid" }
		}).as("loginRequest");


	cy.get("input[name='username']").type(this.credenciaisInvalidas.username);
	cy.get("input[name='password']").type(this.credenciaisInvalidas.password);
	cy.get("button[type='submit']").click();

  });

});