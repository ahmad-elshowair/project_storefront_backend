import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import { User } from '../../Models/User';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Product } from '../../Models/Product';
import { Order } from '../../Models/Order';
import { Order_Products } from '../../Models/Order_Products';
import client from '../../database';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const request = supertest(app);

describe('TEST ORDER_PRODUCTS ENDPOINTS', async () => {
  let token: string;
  let user_id: number;
  let product_id: number;
  let order_id: number;
  beforeAll(async () => {
    // new data for user
    const user_data: User = {
      first_name: 'Ahmad',
      last_name: 'Elshowair',
      email: 'elshowair@mail.com',
      password_digest: '1933',
    };

    // create new  user
    await request
      .post('/create-user')
      .send(user_data)
      .expect(200)
      .then((res) => {
        token = res.body;
        const decoded: JwtPayload = verify(token, TOKEN_SECRET as string);
        user_id = decoded.user.id;
      });

    // new data for product
    const product_data: Product = {
      name: 'iphone',
      price: 1000,
    };

    // create new product
    await request
      .post('/create-product')
      .send(product_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        product_id = res.body.id;
      });

    // new data for order
    const order_data: Order = {
      status: 'active',
      user_id: user_id,
    };

    // create new order
    await request
      .post('/create-order')
      .send(order_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        order_id = res.body.id;
      });
  });

  // test the endpoint of /purchase-product
  it('should return OK of the endpoint /purchase-product', async () => {
    const purchase_product_data: Order_Products = {
      quantity: 10,
      order_id: order_id,
      product_id: product_id,
    };
    await request
      .post('/purchase-product')
      .send(purchase_product_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /order-products
  it('Should return OK of the endpoint /order-product', async () => {
    await request
      .get('/order-products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // after all testing specs delete order products, orders, product & users
  afterAll(async () => {
    const connect = await client.connect();
    const order_products_sql = 'DELETE FROM order_products';
    await connect.query(order_products_sql);
    const orders_sql = 'DELETE FROM orders';
    await connect.query(orders_sql);
    const products_sql = 'DELETE FROM products';
    await connect.query(products_sql);
    const users_sql = 'DELETE FROM users';
    await connect.query(users_sql);
    connect.release();
  });
});
