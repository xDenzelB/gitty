const authenticate = require("../middleware/authenticate");
const Post = require('../models/Post');
const { Router } = require('express')

module.exports = Router()

.get('/all', authenticate, async (req, res, next) => {
    try {
        res.send(await Post.getAll());
    } catch (error) {
        next(error)
    }
})
.get('/posts', authenticate, async (req, res) => {
    res.json(req.user);
})

.post('/', authenticate, async (req, res, next) => {
    try {
        res.send(await Post.insert(req.body));
    } catch (error) {
        next(error)
    }
})