/**
 * Tests for Linear Graph Function
 */
import { describe, expect, it } from 'vitest';
import { createLinearGraph, renderLinearGraphToCanvas, LineSegment, LinearGraphConfig } from '../linear_function';

describe('Linear Graph Function Tests', () => {
    describe('createLinearGraph', () => {
        it('should create HTML with canvas element', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toContain('<canvas');
            expect(html).toContain('id="linearGraph"');
            expect(html).toContain('<script>');
        });

        it('should include segment color in output', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'blue' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toContain('blue');
        });

        it('should handle multiple segments with different colors', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' },
                    { x_start: 10, x_end: 20, y_start: 10, y_end: 5, segment_color: 'green' },
                    { x_start: 20, x_end: 30, y_start: 5, y_end: 15, segment_color: 'blue' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toContain('red');
            expect(html).toContain('green');
            expect(html).toContain('blue');
        });

        it('should use default dimensions when not specified', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toContain('width="800"');
            expect(html).toContain('height="600"');
        });

        it('should use custom dimensions when specified', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ],
                width: 1000,
                height: 800
            };

            const html = createLinearGraph(config);
            expect(html).toContain('width="1000"');
            expect(html).toContain('height="800"');
        });

        it('should throw error when no segments provided', () => {
            const config: LinearGraphConfig = {
                segments: []
            };

            expect(() => createLinearGraph(config)).toThrow('At least one line segment is required');
        });

        it('should handle negative coordinates', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: -10, x_end: 10, y_start: -5, y_end: 5, segment_color: 'purple' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toBeDefined();
            expect(html).toContain('purple');
        });

        it('should handle segments with same start and end points', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 5, x_end: 5, y_start: 5, y_end: 5, segment_color: 'black' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toBeDefined();
        });
    });

    describe('renderLinearGraphToCanvas', () => {
        it('should throw error if canvas not found', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' }
                ]
            };

            expect(() => renderLinearGraphToCanvas('nonexistent', config)).toThrow('Canvas element with id "nonexistent" not found');
        });

        it('should validate segments before attempting to render', () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.id = 'testCanvas';
            document.body.appendChild(canvas);

            const config: LinearGraphConfig = {
                segments: []
            };

            // The function should throw an error about segments before trying to get context
            // This validates input checking happens first
            expect(() => renderLinearGraphToCanvas('testCanvas', config)).toThrow();
        });
    });

    describe('JSON input handling', () => {
        it('should work with JSON parsed data', () => {
            const jsonString = JSON.stringify({
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: 'red' },
                    { x_start: 10, x_end: 20, y_start: 10, y_end: 20, segment_color: 'blue' }
                ]
            });

            const config = JSON.parse(jsonString) as LinearGraphConfig;
            const html = createLinearGraph(config);

            expect(html).toBeDefined();
            expect(html).toContain('red');
            expect(html).toContain('blue');
        });

        it('should handle complex color formats', () => {
            const config: LinearGraphConfig = {
                segments: [
                    { x_start: 0, x_end: 10, y_start: 0, y_end: 10, segment_color: '#FF5733' },
                    { x_start: 10, x_end: 20, y_start: 10, y_end: 5, segment_color: 'rgb(255, 0, 0)' },
                    { x_start: 20, x_end: 30, y_start: 5, y_end: 15, segment_color: 'rgba(0, 255, 0, 0.5)' }
                ]
            };

            const html = createLinearGraph(config);
            expect(html).toContain('#FF5733');
            expect(html).toContain('rgb(255, 0, 0)');
            expect(html).toContain('rgba(0, 255, 0, 0.5)');
        });
    });
});
