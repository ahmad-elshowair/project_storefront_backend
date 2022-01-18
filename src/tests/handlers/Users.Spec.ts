import supertest from 'supertest';
import app from '../../server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../Models/User';
import client from '../../database';

dotenv.config();
const request = supertest(app);
const { TOKEN_SECRET } = process.env;

describe('TEST USER ENDPOINTS', () => {
  const user_data: User = {
    first_name: 'Ahmad',
    last_name: 'Elshowair',
    email: 'elshowair@mail.com',
    password_digest: '1933',
  };
  let token: string;
  let user_id: number;
  // test the endpoint of creating a user
  it('should return OK with endpoint /create-user', async () => {
    await request
      .post('/create-user')
      .send(user_data)
      .expect(200)
      .then((res) => {
        token = res.body;
        const decoded: JwtPayload = jwt.verify(token, TOKEN_SECRET as string);
        user_id = decoded.user.id;
      });
  });
  // test the endpoint of get all users
  it('should return OK with endpoint /users', async () => {
    await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of get as user
  it('should return OK with the endpoint of /get-user', async () => {
    await request
      .get(`/get-user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test the endpoint of /login-user
  // it('Should return OK with the endpoint of /login-user', async () => {
  //   const logData = {
  //     email: user_data.email,
  //     password: user_data.password_digest,
  //   };
  //   await request.post('/login-user').send(logData).expect(200);
  // });

  // test endpoint of /update-user
  it('Should return OK with the endpoint of /update-user', async () => {
    const userData: User = {
      first_name: 'Thuy',
      last_name: 'Pham',
      email: 'xuxu@mail.com',
      password_digest: '1995',
    };
    await request
      .patch(`/edit-user/${user_id}`)
      .send(userData)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  // test endpoint of /delete-user
  it('Should return OK with the endpoint of /delete-user', async () => {
    await request
      .del(`/delete-user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  afterAll(async () => {
    await client.query(
      'delete from users;\n alter sequence users_id_seq restart with 1;'
    );
  });
});
