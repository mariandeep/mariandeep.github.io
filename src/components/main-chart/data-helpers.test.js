import { describe, expect, vitest, it, test } from 'vitest';
import { tryAuthUser, postData } from './data-helpers';
import { formatISO, addDays } from 'date-fns';
import secrets from './../../secrets.json';
import env from './../../env.json';

describe('Data adapter tests', async () => {
    const daysAgo = -60;

    it('should return glucose readings for today', async () => {
        const result = await postData(env.Endpoints.Glucose, secrets.User, {
            startDate: addDays(new Date(), daysAgo).toISOString(),
            endDate: addDays(new Date(), daysAgo + 7).toISOString(),
            pageNumber: 1,
            pageSize: 10,
        });
        expect(result).toBeDefined();
    });
    it('should return insuline readings for today', async () => {
        const result = await postData(env.Endpoints.Insulin, secrets.User, {
            startDate: addDays(new Date(), daysAgo).toISOString(),
            endDate: addDays(new Date(), daysAgo + 7).toISOString(),
            pageNumber: 1,
            pageSize: 10,
        });
        expect(result).toBeDefined();
        console.log(result);
    });
});

describe('Login and Register tests', () => {
    it('should login', async () => {
        const user = await tryAuthUser(secrets.User);
        expect(user.Token).toBeDefined();
    });
});
