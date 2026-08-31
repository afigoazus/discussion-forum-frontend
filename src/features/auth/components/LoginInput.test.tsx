/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByTestId('email-input');

    await userEvent.type(emailInput, 'emailtest');

    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByTestId('password-input');

    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByTestId('email-input');
    await userEvent.type(emailInput, 'emailtest@example.com');

    const passwordInput = await screen.getByTestId('password-input');
    await userEvent.type(passwordInput, 'passwordtest');

    const loginButton = await screen.getByTestId('login-button');

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'emailtest@example.com',
      password: 'passwordtest',
    });
  });
});
