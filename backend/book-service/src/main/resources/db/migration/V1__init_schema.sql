CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    description TEXT
);

CREATE TABLE highlight (
    id SERIAL PRIMARY KEY,
    book_id BIGINT,
    text TEXT,
    color VARCHAR(50)
);

CREATE TABLE reading_progress (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    book_id BIGINT,
    page INT
);