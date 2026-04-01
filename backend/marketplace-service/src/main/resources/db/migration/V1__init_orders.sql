CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    book_id BIGINT,
    amount DOUBLE PRECISION,
    status VARCHAR(50),
    payment_id VARCHAR(255)
);