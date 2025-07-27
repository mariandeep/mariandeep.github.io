//@ts-check
import { describe, expect, it } from 'vitest';
import { tryAuthUser, postData, getPageableBody } from './data-helpers';
import secrets from './../../secrets.json';
import env from './../../env.json';
import { parseISO } from 'date-fns';

const DATE = new Date(2025, 4, 10, 0, 0, 0, 0);
const PAGE_NUMBER = 1;
const PAGE_SIZE = 100;

describe('Data adapter tests', async () => {
    it('should create proper body', () => {
        const body = getPageableBody(DATE, 1, PAGE_NUMBER, PAGE_SIZE);
        expect(body).toEqual({
            startDate: '2025-05-08T16:00:00.000Z',
            endDate: '2025-05-09T16:00:00.000Z',
            pageNumber: PAGE_NUMBER,
            pageSize: PAGE_SIZE,
        });
    });
    it('should create proper body', () => {
        const body = getPageableBody(DATE, 7, PAGE_NUMBER, PAGE_SIZE);
        expect(body).toEqual({
            startDate: '2025-05-02T16:00:00.000Z',
            endDate: '2025-05-09T16:00:00.000Z',
            pageNumber: PAGE_NUMBER,
            pageSize: PAGE_SIZE,
        });
    });
    it('should return glucose readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Glucose, secrets.User, getPageableBody(DATE, 7, PAGE_NUMBER));
        expect(dataOrError).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
        expect(dataOrError.readings[0]).toBeDefined();
        expect(dataOrError.readings[0].readingTime?.length).toEqual(20);
        expect(parseISO(dataOrError.readings[0].readingTime)).toBeDefined();
        expect(dataOrError.readings[0].glucoseLevel).toBeGreaterThan(0);
        expect(dataOrError.readings[0].inventoryItem).toBeDefined();
    });
    it('should return insuline readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(DATE, 7));
        expect(dataOrError).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
        expect(dataOrError.readings[0]).toBeDefined();
        expect(dataOrError.readings[0].dose).toBeGreaterThanOrEqual(1);
        expect(dataOrError.readings[0].readingTime?.length).toEqual(20);
        expect(parseISO(dataOrError.readings[0].readingTime)).toBeDefined();
        expect(dataOrError.readings[0].inventoryItem).toBeDefined();
    });
    it.fails('should return insuline readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(DATE, 7));
        expect(dataOrError.readings[0].insulinDevice).toBeDefined();
        expect(dataOrError.readings[0].insulinBrand).toBeDefined();
    });
    it('should return error', async () => {
        let result;
        try {
            result = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(DATE, 7));
        } finally {
            expect(result).toBeDefined();
        }
    });
});

describe('Login and Register tests', () => {
    it('should login', async () => {
        const user = await tryAuthUser(secrets.User);
        expect(user).toBeDefined();
        // @ts-ignore
        expect(user.Token).toBeDefined();
        // @ts-ignore
        expect(user.Token.length).toBeGreaterThan(100);
    });
});
