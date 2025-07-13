import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { MainPage } from './main-page';

describe('Main Page rendered', () => {
    it('should render', () => {
        render(<MainPage />);
        const page = screen.getByTestId('main-page');
        expect(page).toBeDefined();
    });
});
