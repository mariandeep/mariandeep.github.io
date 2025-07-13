//@ts-check
import env from './../../env.json';

export const postData = async (
    /** @type {string} */ endpoint,
    /** @type {{ Token: String; Email: string; Password: string; } | undefined} */ user,
    /** @type {object} */ body
) => {
    if (!user) throw new Error();
    if (!user.Token) {
        user = await tryAuthUser(user);
        if (!user || !user.Token) throw new Error('no token');
    }

    const url = `${env.Urls.Backend}${endpoint}`;
    console.warn(user, endpoint);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.Token}`,
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (response.ok) {
        const data = response.json();
        return data;
    }
    console.log(response);
    throw new Error();
};

export const tryAuthUser = async (/** @type {{ Email: String; Password: String; Token: String; }} */ user) => {
    if (!user.Email || !user.Password) throw new Error('User login data is incomplete');
    try {
        const response = await fetch(`${env.Urls.Backend}${env.Endpoints.Auth}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
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
