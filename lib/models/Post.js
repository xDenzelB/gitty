const pool = require('../utils/pool');
const GithubUser = require('./GithubUser');

module.exports = class Post {
    post_id;
    post;
    username;
    avatar;

    constructor(row) {
        this.post_id = row.post_id;
        this.post = row.post;
        this.user_id = row.user_id;
        this.avatar = row.avatar;
    }

    static insert({ post, user_id, avatar }) {
        return pool.query(
            `INSERT INTO 
            posts
            (post, user_id, avatar)
            VALUES
            ($1, $2, $3)
            RETURNING 
            *`,
            [post, user_id, avatar])
            .then(({rows}) => new Post(rows[0]));
    }


    static getAll() {
        return pool.query(

            `SELECT
            *
            FROM
            posts
            `
        )

    .then(({ rows }) => rows.map((row) => new Post(row)));
    }
}
