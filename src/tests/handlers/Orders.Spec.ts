import { JwtPayload, verify } from 'jsonwebtoken';
import supertest from 'supertest';
import { User } from '../../Models/User';
import app from '../../server';
import dotenv from 'dotenv';
import { Order } from '../../Models/Order';
import client from '../../database';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const request = supertest(app);

describe('TEST ORDERS ENDPOINTS', () => {
  let token: string;
  let order_id: number;
  let user_id: number;

  // before any test create a new user to get the token and its id
  beforeAll(async () => {
    const user_data: User = {
      first_name: 'Ahmad',
      last_name: 'Elshowair',
      email: 'elshowair@mail.com',
      password_digest: '1933',
    };
    await request
      .post('/create-user')
      .send(user_data)
      .expect(200)
      .then((res) => {
        token = res.body;
        const decoded: JwtPayload = verify(token, TOKEN_SECRET as string);
        user_id = decoded.user.id;
      });
  });

  // test the endpoint of /create-order
  it('Should return OK with the endpoint /create-order', async () => {
    const order_data: Order = {
      status: 'active',
      user_id: user_id,
    };
    await request
      .post('/create-order')
      .send(order_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        order_id = res.body.id;
      });
  });

  // test the endpoint of /orders
  it('Should return OK of the endpoint /orders', async () => {
    await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /get-order
  it('Should return OK of the endpoint /get-order', async () => {
    await request
      .get(`/get-order/${order_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /edit-order
  it('Should return OK of the endpoint /edit-order', async () => {
    const edit_data: Order = {
      status: 'closed',
      user_id: user_id,
    };
    await request
      .put(`/edit-order/${order_id}`)
      .send(edit_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /delete-order
  it('Should return OK of the endpoint /delete-order', async () => {
    await request
      .del(`/delete-order/${order_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // after all specs delete orders & the users that was created before all specs
  afterAll(async () => {
    const connect = await client.connect();
    const order_sql = 'DELETE FROM orders';
    await connect.query(order_sql);
    const user_sql = 'DELETE FROM users';
    await connect.query(user_sql);
    connect.release;
  });
});
