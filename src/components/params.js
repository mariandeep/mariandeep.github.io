//@ts-check
import { parseISO } from 'date-fns';
import { useSearchParams } from '@solidjs/router';
import secret from './../secrets.json';

export function getObservedDate() {
    const params = useSearchParams()[0];
    let date = secret.DebugTimestamp ? new Date(secret.DebugTimestamp) : new Date();
    if (params.date && typeof params.date === 'string') {
        date = parseISO(params.date);
    }
    return date;
}
