CREATE TABLE "Migrations" (
    hash TEXT UNIQUE NOT NULL
);

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

CREATE TABLE "Characters" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    title TEXT,
    home_planet TEXT,
    affilliation TEXT,
    price NUMERIC(10, 2),
    description TEXT,
    quantity INT,
    image TEXT,
    is_new BOOLEAN,
    is_on_sale BOOLEAN
);

INSERT INTO "Users" (
    first_name,
    last_name,
    address,
    username,
    password,
    email
)
VALUES (
    'Admin',
    '',
    '',
    'jedigrandmaster',
    'password',
    'admin@starwarscharacterproject.com'
);