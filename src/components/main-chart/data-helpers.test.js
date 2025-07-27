//@ts-check
import { describe, expect, it } from 'vitest';
import { tryAuthUser, postData, getPageableBody } from './data-helpers';
import secrets from './../../secrets.json';
import env from './../../env.json';

describe('Data adapter tests', async () => {
    const date = new Date(2025, 4, 10, 0, 0, 0, 0);
    it('should create proper body', () => {
        const body = getPageableBody(date, 1, 1, 10);
        expect(body).toEqual({
            startDate: '2025-05-08T16:00:00.000Z',
            endDate: '2025-05-09T16:00:00.000Z',
            pageNumber: 1,
            pageSize: 10,
        });
    });
    it('should return glucose readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Glucose, secrets.User, getPageableBody(date, 7));
        expect(dataOrError).toBeDefined();
        expect(dataOrError.readings[0]).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
    });
    it('should return insuline readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(date, 7));
        expect(dataOrError).toBeDefined();
        expect(dataOrError.readings[0]).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
    });
    it('should return error', async () => {
        let result;
        try {
            result = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(date, 7));
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
