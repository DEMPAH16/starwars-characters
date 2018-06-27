-- Not going to be used in production, just an example of a subquery
SELECT * FROM "ProductCarts" pc
    JOIN "Carts" c ON c.id = pc.cart_id
    JOIN "Products" p on p.id = pc.product_id
    WHERE c.user_id IN (
        SELECT id from "Users"
            WHERE last_name <> ''
    );