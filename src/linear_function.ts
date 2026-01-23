/**
 * Interface for a linear line segment
 */
export interface LineSegment {
    x_start: number;
    x_end: number;
    y_start: number;
    y_end: number;
    segment_color: string;
}

/**
 * Interface for graph configuration
 */
export interface GraphConfig {
    segments: LineSegment[];
    width?: number;
    height?: number;
    padding?: number;
}

/**
 * Creates an HTML drawing of a graph from linear segments
 * @param config - Configuration object containing line segments and optional dimensions
 * @returns HTML string representing the graph
 */
export function createLinearGraph(config: GraphConfig): string {
    const { segments, width = 800, height = 600, padding = 50 } = config;

    if (!segments || segments.length === 0) {
        return '<div>No segments provided</div>';
    }

    // Calculate bounds for scaling
    const allX = segments.flatMap(s => [s.x_start, s.x_end]);
    const allY = segments.flatMap(s => [s.y_start, s.y_end]);
    
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    // Scale functions to map data coordinates to canvas coordinates
    const scaleX = (x: number) => padding + ((x - minX) / rangeX) * (width - 2 * padding);
    const scaleY = (y: number) => height - padding - ((y - minY) / rangeY) * (height - 2 * padding);

    // Generate SVG lines for each segment
    const lines = segments.map(segment => {
        const x1 = scaleX(segment.x_start);
        const y1 = scaleY(segment.y_start);
        const x2 = scaleX(segment.x_end);
        const y2 = scaleY(segment.y_end);
        
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${segment.segment_color}" stroke-width="2" />`;
    }).join('\n    ');

    // Create axes
    const xAxisY = scaleY(0);
    const yAxisX = scaleX(0);
    const axes = `
    <line x1="${padding}" y1="${xAxisY}" x2="${width - padding}" y2="${xAxisY}" stroke="gray" stroke-width="1" opacity="0.5" />
    <line x1="${yAxisX}" y1="${padding}" x2="${yAxisX}" y2="${height - padding}" stroke="gray" stroke-width="1" opacity="0.5" />`;

    // Generate the complete SVG
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="white" />
    ${axes}
    ${lines}
</svg>`;

    return svg;
}

/**
 * Creates an HTML page with the linear graph
 * @param config - Configuration object containing line segments
 * @returns Complete HTML page string
 */
export function createLinearGraphHTML(config: GraphConfig): string {
    const svg = createLinearGraph(config);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Graph</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Linear Graph Visualization</h1>
        ${svg}
    </div>
</body>
</html>`;
}
