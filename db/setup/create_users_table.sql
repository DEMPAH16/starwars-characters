CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    address TEXT,
    creation_date TIMESTAMP,
    last_login timestamp,
    username TEXT,
    password TEXT,
    email TEXT
);