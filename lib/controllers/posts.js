const authenticate = require("../middleware/authenticate");
const Post = require('../models/Post');
const { Router } = require('express')

module.exports = Router()

.get('/all', authenticate, (req, res, next) => {
    Post.getAll({
        ...req.body
    })
    .then((post) => res.send(post))
    .catch((error) => next(error));
    // try {
    //     res.send(await Post.getAll());
    // } catch (error) {
    //     next(error)
    // }
})
.get('/posts', authenticate, (req, res) => {
    res.json(req.user);
})

.post('/', authenticate, (req, res, next) => {
    Post.insert({
        ...req.body
    })
    .then((post) => res.send(post))
    .catch((error) => (error));
    // try {
    //     res.send(await Post.insert(req.body));
    // } catch (error) {
    //     next(error)
    // }
})