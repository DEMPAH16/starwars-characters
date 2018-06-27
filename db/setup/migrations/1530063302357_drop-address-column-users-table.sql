ALTER TABLE "Users"
    DROP COLUMN address;

ALTER TABLE "Characters"
    RENAME TO "Products";

CREATE TABLE "AddressTypes" (
    id INT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE "Addresses" (
    id SERIAL PRIMARY KEY,
    person_name TEXT,
    address_1 TEXT NOT NULL,
    address_2 TEXT,
    city TEXT NOT NULL,
    state VARCHAR(2) NOT NULL,
    country VARCHAR(2),
    zip NUMERIC(5, 0) NOT NULL,
    address_type_id INT NOT NULL REFERENCES "AddressTypes" (id),
    user_id INT NOT NULL REFERENCES "Users" (id)
);

CREATE TABLE "Carts" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "Users" (id)
);

CREATE TABLE "ProductCarts" (
    cart_id INT REFERENCES "Carts" (id),
    product_id INT REFERENCES "Products" (id),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);