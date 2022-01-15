import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const PEPPER = process.env.PEPPER;
const SALT_ROUNDS = (process.env.SALT_ROUNDS as unknown) as string

export type User = {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  password_digest: string
}


export class UserModel {
  static id: any;

  async index(): Promise<User[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connect.query(sql);
      const users = result.rows;
      connect.release();
      return users;
    } catch (error) {
      throw new Error(`Beep cannot get any user ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await connect.query(sql, [id]);
      if (result.rows.length) {
        const user = result.rows[0];
        connect.release();
		    return user;
      } else {
        throw new Error("the user is not excite!");
      }
    } catch (error) {
      throw new Error(`Beep cannot get that user ${error}`);
      
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connect = await client.connect();

      const checkEmail = 'SELECT u FROM users u WHERE email = ($1)';
      const resultEmail = await connect.query(checkEmail, [user.email]); 
      if (resultEmail.rows.length > 0) {
        throw new Error("the user is already excite !");
      } else {
        const hash = bcrypt.hashSync(user.password_digest + PEPPER, parseInt(SALT_ROUNDS));
        user.password_digest = hash;
        const sql =
          'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await connect.query(sql, [
          user.first_name,
          user.last_name,
          user.email,
          user.password_digest,
        ]);
        const created_user = result.rows[0];
        connect.release();
        return created_user;
      }
    } catch (error) {
      throw new Error(`Beep cannot create a user ${error}`);
    }
  }

  async update(user: User): Promise<User>{
    try {
      const connect = await client.connect();
      const hash = bcrypt.hashSync(
			user.password_digest + PEPPER,
			parseInt(SALT_ROUNDS)
		);
		user.password_digest = hash;
      const sql = 'UPDATE users SET first_name =($1), last_name=($2), email=($3), password_digest=($4) WHERE id = ($5) RETURNING *';
      const result = await connect.query(sql, [user.first_name, user.last_name, user.email, user.password_digest, user.id]);
      const updated_user = result.rows[0];
      connect.release();
      return updated_user;
    } catch (error) {
      throw new Error(`Beep cannot edit the user for the following error ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sqlCheck = 'SELECT * FROM users WHERE id = ($1)';
      const resultCheck = await client.query(sqlCheck, [id]);
      if (resultCheck.rows.length === 0) {
        throw new Error('user does not excite !');
      } else {
        const connect = await client.connect();
        const sql = 'DELETE FROM users WHERE id = ($1)';
        const results = await connect.query(sql, [id]);
        const deleted = results.rows[0];
        connect.release();
        return deleted;
      }
    } catch (error) {
      throw new Error(`Beep failed to delete te user due to that: ${error}`);
    }
   
  }

  async login(email: string, password: string): Promise<User | undefined> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT password_digest FROM users WHERE email = ($1)';
      const result = await connect.query(sql, [email]);
      if (result.rows.length) {
        const user = result.rows[0];
          if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
				    return user;
        } else {
          throw new Error("email is not correct");
        }
      }

    } catch (error) {
        throw new Error(`Beep cannot login with this error ${error}`);
    }
  }

}
