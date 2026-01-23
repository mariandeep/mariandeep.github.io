# Copilot Instructions

## Project Overview

This is a personal portfolio website built with SolidJS and Vite. The project name is "discontinuity" and is hosted on GitHub Pages.

## Technology Stack

- **Framework**: SolidJS (reactive UI library)
- **Build Tool**: Vite
- **Testing**: Vitest with solid-testing-library
- **Styling**: CSS with Material Color Palette
- **Data Visualization**: D3.js
- **Routing**: @solidjs/router

## Project Structure

- `/src` - Main source code directory (always work from this directory)
  - `/components` - Reusable UI components
  - `/pages` - Page-level components
  - `/routes` - Routing configuration
  - `/css` - Stylesheets
  - `index.html` - Entry HTML file
  - `index.jsx` - Main application entry point
  - `package.json` - Project dependencies and scripts

- `/assets` - Static assets (copied to dist during build)
- `/dist` - Build output directory (generated, not committed)

## Development Workflow

### Setup
```bash
cd src
npm install
```

### Available Commands

All commands should be run from the `/src` directory:

- `npm run start` - Start development server (port 443 with HTTPS)
- `npm run build` - Run tests, generate coverage, and build for production
- `npm run serve` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run coverage` - Generate test coverage report

### Building
The build process:
1. Runs all tests (`vitest run`)
2. Generates coverage report
3. Builds the application with Vite
4. Outputs to `../dist` directory
5. Copies assets from `../assets` to `../dist`

## Code Conventions

### JavaScript/JSX
- Use **ES modules** (`import`/`export`)
- File extensions: `.js` for utilities, `.jsx` for components
- Component files should use PascalCase (e.g., `main-page.jsx`)
- Test files: `*.test.jsx` or `*.test.js`

### Formatting (Prettier)
- Print width: 120 characters
- Tab width: 4 spaces
- Use semicolons
- Use single quotes
- Trailing commas (ES5)
- Bracket spacing enabled
- Arrow function parens: always

### Testing
- Use Vitest with `describe`, `it`, and `expect`
- Use solid-testing-library for component testing
- Test files should be colocated with components
- Use `screen.getByTestId()` for querying elements
- Add `data-testid` attributes to elements for testing

Example test structure:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from 'solid-testing-library';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
    it('should render', () => {
        render(<MyComponent />);
        const element = screen.getByTestId('my-component');
        expect(element).toBeDefined();
    });
});
```

### SolidJS Patterns
- Use SolidJS reactive primitives (`createSignal`, `createEffect`, etc.)
- Components are just functions that return JSX
- Use `Show`, `For`, and other control flow components from SolidJS
- Avoid using React patterns (no hooks like `useState`, `useEffect`)

## Important Notes

1. **Working Directory**: Always work from the `/src` directory for npm commands
2. **Build Output**: The build outputs to `../dist` relative to the src directory
3. **HTTPS Dev Server**: Development server runs on port 443 with HTTPS enabled
4. **Test Environment**: Tests run in jsdom environment with globals enabled
5. **Module System**: Project uses ES modules (`"type": "module"` in package.json)

## When Making Changes

1. Write tests for new components or functionality
2. Run tests before committing: `npm test`
3. Ensure code follows Prettier formatting
4. Keep components modular and reusable
5. Add data-testid attributes for testable elements
6. Update this documentation if adding new conventions or patterns
