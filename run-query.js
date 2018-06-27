const massive = require('massive');

require('dotenv').config({ path: __dirname + '/.env' });

massive(process.env.DB_CONNECTION_STRING)
    .then(db => {
        // return db.query(`
        //     INSERT INTO "ProductCarts" (
        //         cart_id,
        //         product_id,
        //         quantity
        //     ) VALUES (
        //         \${cartId},
        //         \${productId},
        //         \${quantity}
        //     )
        // `, {
        //     cartId: 3,
        //     productId: 2,
        //     quantity: 17,
        // });
        // return db.query(`
        //     INSERT INTO "Carts" (
        //         user_id
        //     )
        //     VALUES (
        //         3
        //     ), (
        //         4
        //     )
        // `);
        // return db.query(`
        //     INSERT INTO "Users" (
        //         first_name,
        //         last_name,
        //         username,
        //         password,
        //         email
        //     ) VALUES (
        //         \${firstName},
        //         \${lastName},
        //         \${username},
        //         \${password},
        //         \${email}
        //     )
        // `, {
        //     firstName: 'Jill',
        //     lastName: 'Smith',
        //     username: 'jill',
        //     password: 'password',
        //     email: 'jill@jill.com',
            
        // });
        return db.carts.get_user_carts();
    })
    .then(result => console.log(result))
    .catch(err => console.warn(err));