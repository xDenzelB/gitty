const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
    // const client_id = process.env.CLIENT_ID;
    // const client_secret = process.env.CLIENT_SECRET;

    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(
            { client_id: process.env.CLIENT_ID, 
            client_secret: process.env.CLIENT_SECRET, 
            code
        })
    })
    .then((tokenResp) => {
        return tokenResp.json();
    });
};


const getGithubProfile = (token) => {
    fetch('https://github.com/user', {
        headers: {
            Authorization: `token${token}`,
            Accept: 'application/vnd.github.v3+json',
        }
    })
    .then((profileResp) => {
        return profileResp.json();
    })
    .then((profile) => {
        const newProfile = {
            username: profile.login,
            email: profile.email,
            avatar: profile.avatar,
        };
        return newProfile();
    });

};

module.exports = { exchangeCodeForToken, getGithubProfile };