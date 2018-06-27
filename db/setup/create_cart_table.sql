CREATE TABLE "Carts" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "Users" (id)
);