# Linear Graph Function

A TypeScript function that creates SVG-based linear graphs from JSON configuration with colored line segments.

## Files

- `linear_function.ts` - Main TypeScript module with graph generation functions
- `tests/linear_function.test.ts` - Comprehensive test suite (14 tests)
- `linear_graph_demo.html` - Static demo page with 5 examples
- `linear_graph_interactive_standalone.html` - Interactive demo with live JSON input

## Usage

### TypeScript/JavaScript Import

```typescript
import { createLinearGraph, createLinearGraphHTML } from './linear_function';

const config = {
  segments: [
    {
      x_start: 0,
      x_end: 10,
      y_start: 0,
      y_end: 10,
      segment_color: 'blue'
    }
  ],
  width: 800,    // optional, default: 800
  height: 600,   // optional, default: 600
  padding: 50    // optional, default: 50
};

// Generate SVG only
const svg = createLinearGraph(config);

// Generate complete HTML page
const html = createLinearGraphHTML(config);
```

### JSON Configuration

```json
{
  "segments": [
    {
      "x_start": 0,
      "x_end": 5,
      "y_start": 0,
      "y_end": 5,
      "segment_color": "blue"
    },
    {
      "x_start": 5,
      "x_end": 10,
      "y_start": 5,
      "y_end": 0,
      "segment_color": "red"
    }
  ],
  "width": 800,
  "height": 600,
  "padding": 50
}
```

## Parameters

### Required
- **segments** (array): Array of line segment objects, each containing:
  - **x_start** (number): Starting x coordinate
  - **x_end** (number): Ending x coordinate
  - **y_start** (number): Starting y coordinate
  - **y_end** (number): Ending y coordinate
  - **segment_color** (string): Color for the segment (name, hex, rgb, etc.)

### Optional
- **width** (number): Canvas width in pixels (default: 800)
- **height** (number): Canvas height in pixels (default: 600)
- **padding** (number): Padding around the graph in pixels (default: 50)

## Features

- ✅ Automatic scaling to fit all segments within the canvas
- ✅ Coordinate axes with origin marking
- ✅ Support for negative coordinates
- ✅ Multiple color formats (names, hex, rgb)
- ✅ Responsive SVG output
- ✅ TypeScript types included

## Examples

### Simple Line
```json
{
  "segments": [
    { "x_start": 0, "x_end": 10, "y_start": 0, "y_end": 10, "segment_color": "blue" }
  ]
}
```

### Piecewise Function
```json
{
  "segments": [
    { "x_start": 0, "x_end": 2, "y_start": 0, "y_end": 4, "segment_color": "red" },
    { "x_start": 2, "x_end": 4, "y_start": 4, "y_end": 2, "segment_color": "green" },
    { "x_start": 4, "x_end": 6, "y_start": 2, "y_end": 6, "segment_color": "blue" }
  ]
}
```

### Step Function
```json
{
  "segments": [
    { "x_start": 0, "x_end": 2, "y_start": 1, "y_end": 1, "segment_color": "orange" },
    { "x_start": 2, "x_end": 2, "y_start": 1, "y_end": 3, "segment_color": "orange" },
    { "x_start": 2, "x_end": 4, "y_start": 3, "y_end": 3, "segment_color": "orange" }
  ]
}
```

## Demo Pages

### Static Demo
Open `linear_graph_demo.html` in a browser to see pre-built examples including:
- Simple linear function
- Piecewise linear function
- Step function
- Triangle wave
- Negative coordinates

### Interactive Demo
Open `linear_graph_interactive_standalone.html` in a browser to:
- Input custom JSON configurations
- See graphs generated in real-time
- Try quick examples with one click
- Experiment with different parameters

## Running Tests

```bash
npm test -- tests/linear_function.test.ts
```

All 14 tests should pass, covering:
- Empty segments handling
- Single and multiple segments
- Custom dimensions
- Negative coordinates
- Various color formats
- Complete HTML generation
- Edge cases (horizontal/vertical lines)

## Browser Compatibility

The function generates standard SVG, which is supported in all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

This code is part of the mariandeep.github.io repository.
