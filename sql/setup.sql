-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_profile CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE github_profile (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT
); 

CREATE TABLE posts (
    post_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post VARCHAR (255) NOT NULL,
    user_id BIGINT REFERENCES github_profile(id),
    avatar TEXT 
);

INSERT INTO
github_profile (username, email, avatar)
VALUES 
('fake_github_user', 'not-real@example.com', 'https://www.placecage.com/gif/300/300');
INSERT INTO
posts (post, user_id, avatar)
VALUES
('This app rocks!!', 1, 'https://www.placecage.com/gif/300/300');
