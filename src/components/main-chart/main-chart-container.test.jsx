import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { MainChartContainer } from './main-chart-container';

describe('Main chart container rendered', () => {
    it('should render', async () => {
        render(<MainChartContainer />);
        const loader = await screen.findByText('Loading...');
        expect(loader).toBeDefined();
        const page = await screen.findByTestId('chart-container', undefined, { timeout: 10000 });
        expect(page).toBeDefined();
    });
});
