const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');



module.exports = class UserService {

    static create(code) {
    let githubProfile;
   return exchangeCodeForToken(code)
    .then((token) => getGithubProfile(token))
    .then((profile) => {
        githubProfile = profile;
        return GithubUser.findByUsername(profile.login)
    })
    .then((user) => {
        if (!user) {
            return GithubUser.insert(githubProfile)
        } else {
            return user;
        }
    });

//     const token = await exchangeCodeForToken(code);

//     const { login, avatar_url, email } = await getGithubProfile(token);

//     let user = await GithubUser.findByUsername(login);

//     if (!user) {
//     user = await GithubUser.insert({
//         username: login,
//         avatar: avatar_url,
//         email,
//     });
// }
// return user;
    }
};