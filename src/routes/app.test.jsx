import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { App } from './app';

describe('App rendered', () => {
    it('should render', () => {
        render(<App />);
        const page = screen.getByTestId('main-page');
        expect(page).toBeDefined();
    });
});
