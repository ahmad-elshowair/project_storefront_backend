import supertest from 'supertest';
import app from '../../server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../Models/User';

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
  it('should return OK wit endpoint /create-user', async () => {
    await request
      .post('/create-user')
      .send(user_data)
      .expect(200)
      .then((response) => {
        token = response.body;
        const decoded: JwtPayload = jwt.verify(token, TOKEN_SECRET as string);
        user_id = decoded.user.id;
      });
  });
});
