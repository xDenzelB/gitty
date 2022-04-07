const { Router } = require('express');
const { sign } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 10 * 60 * 60 * 24;

module.exports = Router()

.get('/login', (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
})

.get('/login/callback', (req, res, next) => {
    UserService.create(req.query.code)
    .then((user) => {
        res.cookie(process.env.COOKIE_NAME, sign(user), {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS
        }).redirect('/api/v1/posts');
    })
    .catch((error) => next(error));
    // const user = await UserService.create(req.query.code);
    // const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    //     expiresIn: '1 day',
    // });

    // res
    // .cookie(process.env.COOKIE_NAME, payload, {
    //     httpOnly: true,
    //     maxAge: ONE_DAY_IN_MS,
    // })
    // .redirect('/api/v1/posts/posts');
})

// .get('/posts', authenticate, async (req, res) => {
//     res.json(req.user);
// })

.delete('/sessions', (req, res) => {
    res
    .clearCookie(process.env.COOKIE_NAME)
    .json({ success: true, message: 'Successfully signed out' });
})