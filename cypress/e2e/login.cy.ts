/// <reference types="cypress" />

/**
 * - Login spec
 *   - should display login page correctly
 *   - should not submit when email is empty
 *   - should not password when email is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display login page correctly', () => {
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should not submit when email is empty', () => {
    cy.get('[data-testid="password-input"]').type('passwordtest');

    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-input"]').should('be.focused');
  });

  it('should not submit when password is empty', () => {
    cy.get('[data-testid="email-input"]').type('email@example.com');

    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="password-input"]').should('be.focused');
  });

  it('should display alert when usename and password are wrong', () => {
    cy.get('[data-testid="email-input"]').type('email@example.com');

    cy.get('[data-testid="password-input"]').type('passwordtest');

    cy.get('[data-testid="login-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('[data-testid="email-input"]').type('rahardjo@gmail.com');

    cy.get('[data-testid="password-input"]').type('123123');

    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/threads');

    cy.get('[data-testid="homepage-title"]').should('be.visible');
  });
});
