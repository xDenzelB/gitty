const pool = require('../utils/pool');

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

    static async insert({ post, user_id, avatar }) {
        const { rows } = await pool.query(
            `INSERT INTO 
            posts
            (post, user_id, avatar)
            VALUES
            ($1, $2, $3)
            RETURNING 
            *`,
            [post, user_id, avatar]
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
