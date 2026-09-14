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
    cy.clearLocalStorage();
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Missing authentication',
      },
    });
    cy.visit('/');
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
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFail');

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('[data-testid="email-input"]').type('email@example.com');

    cy.get('[data-testid="password-input"]').type('passwordtest');

    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginFail');
    cy.wrap(alertStub).should('have.been.calledWith', 'email or password is wrong');
  });

  it('should display homepage when email and password are correct', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User logged in',
        data: {
          token: 'fake-token',
        },
      },
    }).as('loginSuccess');

    cy.intercept('GET', '**/users/me', (req) => {
      const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined;
      if (authHeader && authHeader.includes('fake-token')) {
        req.reply({
          statusCode: 200,
          body: {
            status: 'success',
            message: 'User profile',
            data: {
              user: {
                id: 'user-rahardjo',
                name: 'Rahardjo',
                email: 'rahardjo@gmail.com',
                avatar: 'https://ui-avatars.com/api/?name=Rahardjo',
              },
            },
          },
        });
      } else {
        req.reply({
          statusCode: 401,
          body: {
            status: 'fail',
            message: 'Missing authentication',
          },
        });
      }
    }).as('getProfile');

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Users retrieved',
        data: {
          users: [],
        },
      },
    });

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Threads retrieved',
        data: {
          threads: [],
        },
      },
    });

    cy.get('[data-testid="email-input"]').type('rahardjo@gmail.com');

    cy.get('[data-testid="password-input"]').type('123123');

    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginSuccess');
    cy.wait('@getProfile');

    cy.url({ timeout: 10000 }).should('include', '/threads');

    cy.get('[data-testid="homepage-title"]', { timeout: 10000 }).should('be.visible');
  });
});
