import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { App } from './app';
import { Router, Route } from '@solidjs/router';

describe('App rendered', () => {
    it('should render', () => {
        render(<App />, {
            wrapper: (props) => {
                return (
                    <Router>
                        <Route path="/" component={() => <div>{props.children}</div>} />
                    </Router>
                );
            },
        });
        const page = screen.getByTestId('main-page');
        expect(page).toBeDefined();
    });
});
