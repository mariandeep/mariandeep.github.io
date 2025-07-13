import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { Login } from './login';

describe('Login rendered', () => {
    it('should render', () => {
        render(<Login />);
        const page = screen.getByTestId('login-page');
        expect(page).toBeDefined();
    });
});
