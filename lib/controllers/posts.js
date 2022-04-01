const authenticate = require("../middleware/authenticate");
const Post = require('../models/Post');
const { Router } = require('express')

module.exports = Router()

.get('/', authenticate, async (req, res, next) => {
    try {
        res.send(await Post.getAll());
    } catch (error) {
        next(error)
    }
})