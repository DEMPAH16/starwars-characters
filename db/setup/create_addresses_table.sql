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