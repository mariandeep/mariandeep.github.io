import { describe, expect, vitest, it, test } from 'vitest';
import { tryAuthUser, postData } from './data-helpers';
import secrets from './../../secrets.json';
import env from './../../env.json';

describe('Data adapter tests', async () => {
    it('should return glucose readings for today', async () => {
        expect(
            await postData(env.Endpoints.Glucose, secrets.User, {
                startDate: new Date().toUTCString(),
                endDate: new Date().toUTCString(),
                pageNumber: 0,
                pageSize: 10,
            })
        ).toBeDefined();
    });
});

describe('Login and Register tests', () => {
    it('should login', async () => {
        const user = await tryAuthUser(secrets.User);
        expect(user.Token).toBeDefined();
    });
});
