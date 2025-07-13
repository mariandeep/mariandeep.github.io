import { describe, expect, vitest, it, test } from 'vitest';
import { getData } from './data-helpers';

describe('empty test', () => {
    it('', () => {
        const url = 'assets/data/data.json';
        expect(url).toBeDefined();
    });
});
