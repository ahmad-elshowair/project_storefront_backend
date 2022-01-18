import supertest from 'supertest';
import { Product } from '../../Models/Product';
import app from '../../server';
import { User } from '../../Models/User';
import client from '../../database';

const request = supertest(app);

describe('TEST PRODUCTS ENDPOINTS', () => {
  const product_data: Product = {
    name: 'iphone',
    price: 1000,
  };
  let product_id: number;
  let token: string;

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
      });
  });

  // test the endpoint of /create-product method
  it('Should return OK with the endpoint /create-product', async () => {
    await request
      .post('/create-product')
      .set('Authorization', `Bearer ${token}`)
      .send(product_data)
      .expect(200)
      .then((res) => {
        expect(res.body.price).toEqual(1000);
        product_id = res.body.id;
      });
  });

  // test the endpoint of /products method
  it('Should return OK with the endpoint of /products', async () => {
    await request.get('/products').expect(200);
  });

  // test the endpoint of /get-product method
  it('Should return OK with the endpoint of /products', async () => {
    await request
      .get(`/get-product/${product_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of  /edit-product
  it('Should return OK with the endpoint of /edit-product', async () => {
    const edit_data: Product = {
      name: 'nokia',
      price: 500,
    };
    await request
      .put(`/edit-product/${product_id}`)
      .send(edit_data)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /delete-product
  it('Should return OK with the endpoint of /delete-product', async () => {
    await request
      .del(`/delete-product/${product_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // after all test delete the user that had created before all tests
  afterAll(async () => {
    await client.query(
      'delete from users;\n alter sequence users_id_seq restart with 1;'
    );
  });
});
