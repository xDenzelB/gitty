const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code}),
    });
};

const getGithubProfile = async (token) => {
    const res = await fetch('https://github.com/user', {
        headers: {
            Authorization: `token${token}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });

    return res.json();
}

module.exports = { exchangeCodeForToken, getGithubProfile };