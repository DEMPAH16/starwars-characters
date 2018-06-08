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