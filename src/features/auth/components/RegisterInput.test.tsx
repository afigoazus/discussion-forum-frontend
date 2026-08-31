/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when login button is clicked
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByTestId('name-input');

    await userEvent.type(nameInput, 'nametest');

    expect(nameInput).toHaveValue('nametest');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByTestId('email-input');

    await userEvent.type(emailInput, 'emailtest');

    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByTestId('password-input');

    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when login button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByTestId('name-input');
    await userEvent.type(nameInput, 'nametest');

    const emailInput = await screen.getByTestId('email-input');
    await userEvent.type(emailInput, 'emailtest@example.com');

    const passwordInput = await screen.getByTestId('password-input');
    await userEvent.type(passwordInput, 'passwordtest');

    const registerButton = await screen.getByTestId('register-button');

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'nametest',
      email: 'emailtest@example.com',
      password: 'passwordtest',
    });
  });
});
