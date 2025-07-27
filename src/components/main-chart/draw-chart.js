import * as d3 from 'd3';
import { addMinutes, parseISO } from 'date-fns';

export function drawChart(ref, glucoseReadings, insulinReadings) {
    if (!glucoseReadings) return;
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 600;
    const marginTop = 25;
    const marginRight = 20;
    const marginBottom = 35;
    const marginLeft = 40;

    const doseColors = d3.scaleLinear([0, 24], [0x33, 0x00]);
    // Prepare the scales for positional encoding.
    const xTime = d3
        .scaleLinear()
        .domain(d3.extent(glucoseReadings, (d) => parseISO(d.readingTime)))
        .nice()
        .range([marginLeft, width - marginRight]);

    const yGlucose = d3
        .scaleLinear()
        .domain(d3.extent(glucoseReadings, (d) => d.glucoseLevel))
        .nice()
        .range([height - marginBottom, marginTop]);

    const yInsulin = d3
        .scaleLinear()
        .domain([0, 30])
        .rangeRound([marginTop, height - marginBottom]);

    // Create the SVG container.
    const svg = d3
        .create('svg')
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    // Create the axes.
    svg.append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(xTime).ticks(width / 80))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
            g
                .append('text')
                .attr('x', width)
                .attr('y', marginBottom - 4)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'end')
                .text('Hour')
        );

    svg.append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yGlucose))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
            g
                .append('text')
                .attr('x', -marginLeft)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text('Glucose mmol/l')
        );

    // Create the grid.
    svg.append('g')
        .attr('stroke', 'currentColor')
        .attr('stroke-opacity', 0.1)
        .call((g) =>
            g
                .append('g')
                .selectAll('line')
                .data(xTime.ticks())
                .join('line')
                .attr('x1', (d) => 0.5 + xTime(d))
                .attr('x2', (d) => 0.5 + xTime(d))
                .attr('y1', marginTop)
                .attr('y2', height - marginBottom)
        )
        .call((g) =>
            g
                .append('g')
                .selectAll('line')
                .data(yGlucose.ticks())
                .join('line')
                .attr('y1', (d) => 0.5 + yGlucose(d))
                .attr('y2', (d) => 0.5 + yGlucose(d))
                .attr('x1', marginLeft)
                .attr('x2', width - marginRight)
        );

    const doseByTime = (d) => d.dose / d.inventoryItem.insulinBrand.durationMinutes / 60;

    svg.append('g')
        .attr('stroke', '#c0ca33AA')
        .attr('stroke-width', 1)
        .selectAll()
        .data(insulinReadings)
        .join('rect')
        .attr('fill', (d) => `#c0ca33${Math.round(doseColors(doseByTime(d))).toString(16)}`)
        .attr('data-dose', (d) => d.dose)
        .attr('data-date', (d) => d.readingTime)
        .attr('data-y', (d) => yInsulin(doseByTime(d)))
        .attr('data-duration', (d) => d.inventoryItem.insulinBrand.durationMinutes / 60)
        .attr('x', (d) => xTime(parseISO(d.readingTime)))
        .attr('width', (d) => xTime(addMinutes(parseISO(d.readingTime), d.inventoryItem.insulinBrand.durationMinutes)))
        .attr('y', (d) => yInsulin(0))
        .attr('height', (d) => yInsulin(d.dose / (d.inventoryItem.insulinBrand.durationMinutes / 60)));

    // Add a layer of dots.
    svg.append('g')
        .attr('stroke', 'var(--text-warn)')
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .selectAll('circle')
        .data(glucoseReadings)
        .join('circle')
        .attr('cx', (d) => xTime(parseISO(d.readingTime)))
        .attr('cy', (d) => yGlucose(d.glucoseLevel))
        .attr('r', 3);

    ref.appendChild(svg.node());
}
