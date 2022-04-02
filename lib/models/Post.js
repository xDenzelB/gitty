const pool = require('../utils/pool');

module.exports = class Post {
    user_id;
    post;
    username;
    avatar;

    constructor(row) {
        this.user_id = row.user_id;
        this.post = row.post;
        this.username = row.username;
        this.avatar = row.avatar;
    }

    static async insert({ post, username, avatar}) {
        const { rows } = await pool.query(
            `INSERT INTO 
            posts
            (post, username, avatar)
            VALUES
            ($1, $2, $3)
            RETURNING 
            *`,
            [post, username, avatar]
        );
        return new Post(rows[0]);
    }


    static async getAll() {
        const { rows } = await pool.query(

            `SELECT
            *
            FROM
            posts
            `
        );

    return rows.map((row) => new Post(row));
    }
}
