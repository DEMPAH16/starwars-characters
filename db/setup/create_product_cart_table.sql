CREATE TABLE "ProductCarts" (
    cart_id INT REFERENCES "Carts" (id),
    product_id INT REFERENCES "Products" (id),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);