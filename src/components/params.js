//@ts-check
import { parseISO } from 'date-fns';
import { useSearchParams } from '@solidjs/router';

export function getObservedDate() {
    let params = globalThis.vitest ? { date: '2025-05-06T00:00:00.000Z' } : useSearchParams()[0];
    let date = new Date();
    if (params.date && typeof params.date === 'string') {
        date = parseISO(params.date);
    }
    return date;
}
