//@ts-check
import env from './../../env.json';
import { addDays } from 'date-fns';

export const postData = async (
    /** @type {String} */ endpoint,
    /** @type {{ Token: String | null; Email: String; Password: String; } | undefined} */ user,
    /** @type {Object} */ body,
    /** @type {String} */ path
) => {
    if (!user) throw new Error();
    if (!user.Token) {
        user = await tryAuthUser(user);
        if (!user || !user.Token) throw new Error('no token');
    }

    const url = `${env.Urls.Backend}${endpoint}`;
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Authorization': `Bearer ${user.Token}`,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
    });
    if (response.ok) {
        let data = await response.json();
        if (data && path) return data[path];
        else return data;
    }
    return new Error(response.statusText);
};

/**
 * @param {{ Email: String; Password: String; Token: String | null; }} user
 * @returns {Promise<{ Email: String; Password: String; Token: String | null; } | undefined>}
 */
export const tryAuthUser = async (user) => {
    if (!user.Email || !user.Password) throw new Error('User login data is incomplete');
    try {
        const response = await fetch(`${env.Urls.Backend}${env.Endpoints.Auth}`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: user.Email,
                password: user.Password,
            }),
        });
        if (response.ok && response.status === 200) {
            const data = await response.json();
            user.Token = data.token;
            return user;
        }
    } catch (err) {
        console.error(err);
        return;
    }
};

const MAX_PAGE_SIZE = 100;

export function getPageableBody(date, days, pageNumber = 1, pageSize = MAX_PAGE_SIZE) {
    if (pageSize > MAX_PAGE_SIZE) throw new Error(`max pageSize is ${MAX_PAGE_SIZE}`);
    if (pageNumber < 1) throw new Error('pageNumber must be greater than 0');
    const endDate = addDays(date, days * -1);
    return {
        startDate: endDate.toISOString(),
        endDate: date.toISOString(),
        pageNumber: pageNumber,
        pageSize: pageSize,
    };
}
