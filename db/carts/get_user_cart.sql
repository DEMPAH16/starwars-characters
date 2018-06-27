SELECT p.*, pc.*, p.quantity AS "product_quantity", pc.quantity AS "cart_quantity" from "ProductCarts" pc
    JOIN "Products" p ON p.id = pc.product_id
    JOIN "Carts" c ON c.id = pc.cart_id
    WHERE c.user_id = ${userId};