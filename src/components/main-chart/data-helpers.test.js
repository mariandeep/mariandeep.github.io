import { describe, expect, vitest, it, test } from 'vitest';
import { tryAuthUser, postData } from './data-helpers';
import secrets from './../../secrets.json';
import env from './../../env.json';
import { getPageableBody } from './data-helpers';

describe('Data adapter tests', async () => {
    it('should return glucose readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Glucose, secrets.User, getPageableBody(new Date(), 7));
        expect(dataOrError).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
    });
    it('should return insuline readings for today', async () => {
        const dataOrError = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(new Date(), 7));
        expect(dataOrError).toBeDefined();
        expect(dataOrError).toBeInstanceOf(Object);
    });
    it('should return error', async () => {
        let result;
        try {
            result = await postData(env.Endpoints.Insulin, secrets.User, getPageableBody(new Date(), 7));
        } finally {
            expect(result).toBeDefined();
        }
    });
});

describe('Login and Register tests', () => {
    it('should login', async () => {
        const user = await tryAuthUser(secrets.User);
        expect(user.Token).toBeDefined();
        expect(user.Token.length).toBeGreaterThan(10);
    });
});
