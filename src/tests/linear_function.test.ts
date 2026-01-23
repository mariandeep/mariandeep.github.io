import { describe, expect, it } from 'vitest';
import { createLinearGraph, createLinearGraphHTML, LineSegment, GraphConfig } from '../linear_function';

describe('Linear Graph Function Tests', () => {
    describe('createLinearGraph', () => {
        it('should return a message when no segments provided', () => {
            const config: GraphConfig = { segments: [] };
            const result = createLinearGraph(config);
            expect(result).toContain('No segments provided');
        });

        it('should create SVG with single line segment', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('<svg');
            expect(result).toContain('</svg>');
            expect(result).toContain('stroke="red"');
            expect(result).toContain('<line');
        });

        it('should create SVG with multiple line segments', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 5, y_start: 0, y_end: 5, segment_color: 'blue' },
                    { x_start: 5, x_end: 10, y_start: 5, y_end: 0, segment_color: 'green' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('stroke="blue"');
            expect(result).toContain('stroke="green"');
            // Should have 2 line segments plus axes
            const lineCount = (result.match(/<line/g) || []).length;
            expect(lineCount).toBeGreaterThanOrEqual(2);
        });

        it('should use custom dimensions when provided', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ],
                width: 400,
                height: 300
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('width="400"');
            expect(result).toContain('height="300"');
        });

        it('should use default dimensions when not provided', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('width="800"');
            expect(result).toContain('height="600"');
        });

        it('should handle negative coordinates', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: -10, x_end: 10, y_start: -5, y_end: 5, segment_color: 'purple' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('<svg');
            expect(result).toContain('stroke="purple"');
        });

        it('should handle segments with different colors', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 2, y_start: 0, y_end: 2, segment_color: '#FF5733' },
                    { x_start: 2, x_end: 4, y_start: 2, y_end: 4, segment_color: '#33FF57' },
                    { x_start: 4, x_end: 6, y_start: 4, y_end: 2, segment_color: '#3357FF' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('stroke="#FF5733"');
            expect(result).toContain('stroke="#33FF57"');
            expect(result).toContain('stroke="#3357FF"');
        });

        it('should include axes in the output', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };
            const result = createLinearGraph(config);
            
            // Should contain axes (gray lines)
            expect(result).toContain('stroke="gray"');
        });
    });

    describe('createLinearGraphHTML', () => {
        it('should create complete HTML page', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };
            const result = createLinearGraphHTML(config);
            
            expect(result).toContain('<!DOCTYPE html>');
            expect(result).toContain('<html');
            expect(result).toContain('</html>');
            expect(result).toContain('<title>Linear Graph</title>');
            expect(result).toContain('<svg');
        });

        it('should include styles in HTML', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'blue' }
                ]
            };
            const result = createLinearGraphHTML(config);
            
            expect(result).toContain('<style>');
            expect(result).toContain('</style>');
        });

        it('should include heading in HTML', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'green' }
                ]
            };
            const result = createLinearGraphHTML(config);
            
            expect(result).toContain('<h1>Linear Graph Visualization</h1>');
        });
    });

    describe('Complex scenarios', () => {
        it('should create a piecewise linear function', () => {
            // Creating a triangle wave pattern
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 1, y_start: 0, y_end: 1, segment_color: 'red' },
                    { x_start: 1, x_end: 2, y_start: 1, y_end: 0, segment_color: 'orange' },
                    { x_start: 2, x_end: 3, y_start: 0, y_end: 1, segment_color: 'yellow' },
                    { x_start: 3, x_end: 4, y_start: 1, y_end: 0, segment_color: 'green' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('<svg');
            const lineCount = (result.match(/stroke="(?:red|orange|yellow|green)"/g) || []).length;
            expect(lineCount).toBe(4);
        });

        it('should handle horizontal line segment', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 5, y_end: 5, segment_color: 'black' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('<svg');
            expect(result).toContain('stroke="black"');
        });

        it('should handle vertical line segment', () => {
            const config: GraphConfig = {
                segments: [
                    { x_start: 5, x_end: 5, y_start: 0, y_end: 10, segment_color: 'brown' }
                ]
            };
            const result = createLinearGraph(config);
            
            expect(result).toContain('<svg');
            expect(result).toContain('stroke="brown"');
        });
    });
});
