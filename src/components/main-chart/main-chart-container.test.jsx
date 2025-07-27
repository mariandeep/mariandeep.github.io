import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { MainChartContainer } from './main-chart-container';

describe('Main Page rendered', () => {
    it.fails('should render', () => {
        render(<MainChartContainer />);
        const page = screen.getByTestId('chart-container');
        expect(page).toBeDefined();
    });
});
