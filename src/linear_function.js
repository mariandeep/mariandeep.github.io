/**
 * Linear Graph Function
 * Creates an HTML canvas drawing of a graph built from linear segments
 */
/**
 * Creates an HTML canvas element with a linear graph drawn from the specified segments
 * @param config - Configuration object containing line segments and optional dimensions
 * @returns HTML string containing the canvas element with the drawn graph
 */
export function createLinearGraph(config) {
    const { segments, width = 800, height = 600, padding = 50 } = config;
    if (!segments || segments.length === 0) {
        throw new Error('At least one line segment is required');
    }
    // Find min/max values for scaling
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    segments.forEach((segment) => {
        minX = Math.min(minX, segment.x_start, segment.x_end);
        maxX = Math.max(maxX, segment.x_start, segment.x_end);
        minY = Math.min(minY, segment.y_start, segment.y_end);
        maxY = Math.max(maxY, segment.y_start, segment.y_end);
    });
    // Add some margin to the ranges
    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;
    minX -= xRange * 0.1;
    maxX += xRange * 0.1;
    minY -= yRange * 0.1;
    maxY += yRange * 0.1;
    // Scale functions to map data coordinates to canvas coordinates
    const scaleX = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
    const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
    // Generate the drawing commands
    let drawCommands = '';
    segments.forEach((segment) => {
        const x1 = scaleX(segment.x_start);
        const y1 = scaleY(segment.y_start);
        const x2 = scaleX(segment.x_end);
        const y2 = scaleY(segment.y_end);
        drawCommands += `
        ctx.strokeStyle = '${segment.segment_color}';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(${x1}, ${y1});
        ctx.lineTo(${x2}, ${y2});
        ctx.stroke();`;
    });
    // Add axes
    const axisCommands = `
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(${padding}, ${scaleY(0)});
        ctx.lineTo(${width - padding}, ${scaleY(0)});
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(${scaleX(0)}, ${padding});
        ctx.lineTo(${scaleX(0)}, ${height - padding});
        ctx.stroke();
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels
        ctx.fillText('${minX.toFixed(1)}', ${padding}, ${height - padding + 20});
        ctx.fillText('${maxX.toFixed(1)}', ${width - padding}, ${height - padding + 20});
        
        // Y-axis labels
        ctx.textAlign = 'right';
        ctx.fillText('${maxY.toFixed(1)}', ${padding - 10}, ${padding + 5});
        ctx.fillText('${minY.toFixed(1)}', ${padding - 10}, ${height - padding + 5});`;
    return `
<canvas id="linearGraph" width="${width}" height="${height}" style="border: 1px solid #ccc;"></canvas>
<script>
(function() {
    const canvas = document.getElementById('linearGraph');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ${width}, ${height});
    ${axisCommands}
    ${drawCommands}
})();
</script>`;
}
/**
 * Renders a linear graph directly into a canvas element
 * @param canvasId - ID of the canvas element to render into
 * @param config - Configuration object containing line segments
 */
export function renderLinearGraphToCanvas(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        throw new Error(`Canvas element with id "${canvasId}" not found`);
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to get 2D context from canvas');
    }
    const { segments, width = 800, height = 600, padding = 50 } = config;
    if (!segments || segments.length === 0) {
        throw new Error('At least one line segment is required');
    }
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    // Find min/max values for scaling
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    segments.forEach((segment) => {
        minX = Math.min(minX, segment.x_start, segment.x_end);
        maxX = Math.max(maxX, segment.x_start, segment.x_end);
        minY = Math.min(minY, segment.y_start, segment.y_end);
        maxY = Math.max(maxY, segment.y_start, segment.y_end);
    });
    // Add some margin to the ranges
    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;
    minX -= xRange * 0.1;
    maxX += xRange * 0.1;
    minY -= yRange * 0.1;
    maxY += yRange * 0.1;
    // Scale functions to map data coordinates to canvas coordinates
    const scaleX = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
    const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, scaleY(0));
    ctx.lineTo(width - padding, scaleY(0));
    ctx.stroke();
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(scaleX(0), padding);
    ctx.lineTo(scaleX(0), height - padding);
    ctx.stroke();
    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    // X-axis labels
    ctx.fillText(minX.toFixed(1), padding, height - padding + 20);
    ctx.fillText(maxX.toFixed(1), width - padding, height - padding + 20);
    // Y-axis labels
    ctx.textAlign = 'right';
    ctx.fillText(maxY.toFixed(1), padding - 10, padding + 5);
    ctx.fillText(minY.toFixed(1), padding - 10, height - padding + 5);
    // Draw line segments
    segments.forEach((segment) => {
        const x1 = scaleX(segment.x_start);
        const y1 = scaleY(segment.y_start);
        const x2 = scaleX(segment.x_end);
        const y2 = scaleY(segment.y_end);
        ctx.strokeStyle = segment.segment_color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });
}
