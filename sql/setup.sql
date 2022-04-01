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
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post TEXT NOT NULL,
    username TEXT NOT NULL,
    avatar TEXT 
);

INSERT INTO
posts (post, username, avatar)
VALUES
('This app rocks!!', 'fake_github_user', 'https://www.placecage.com/gif/300/300');