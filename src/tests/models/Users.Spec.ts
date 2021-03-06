import client from '../../database';
import { User, UserModel } from '../../Models/User';

const model = new UserModel();
/* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */

describe('check crud functions', () => {
  it('index method should be declared', () => {
    expect(model.index).toBeDefined();
  });

  it('show method should be declared', () => {
    expect(model.show).toBeDefined();
  });

  it('create method should be declared', () => {
    expect(model.create).toBeDefined();
  });

  it('update method should be declared', () => {
    expect(model.update).toBeDefined();
  });

  it('delete method should be declared', () => {
    expect(model.delete).toBeDefined();
  });

  it('login method should be declared', () => {
    expect(model.login).toBeDefined();
  });
});
/* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

describe('TEST USER MODEL', () => {
  /* ==============================  BEGIN CRUD FUNCTIONALITY  ============================== */
  describe('Test CRUD functionality', () => {
    const userData: User = {
      id: 1,
      first_name: 'Thuy',
      last_name: 'Pham',
      email: 'thuy@email.com',
      password_digest: 'password',
    };
    let user: User;

    /* test create method functionality*/
    it('should create a new user', async () => {
      user = await model.create(userData);
      expect({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password_digest: user.password_digest,
      }).toEqual({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password_digest: userData.password_digest,
      });
    });

    /* test user index method functionality*/
    it('index method should return users', async () => {
      const users = await model.index();
      expect(users).toEqual([user]);
    });

    // test show user method functionality
    it('should get a user', async () => {
      const getUser = await model.show(user.id as number);
      expect(getUser).toEqual(user);
    });

    // test update user method functionality
    it('should update a user', async () => {
      const updateData: User = {
        id: user.id,
        first_name: 'Ahmad',
        last_name: 'Elshowair',
        email: 'elshowair@mail.com',
        password_digest: '1933',
      };
      const updatedUser: User = await model.update(updateData);
      expect(updatedUser.last_name).toEqual('Elshowair');
    });

    // test deleting user
    it('should delete a user', async () => {
      await model.delete(user.id as unknown as number);
      const users = await model.index();
      expect(users).toEqual([]);
    });
  });
  afterAll(async () => {
    await client.query(
      'delete from users;\n alter sequence users_id_seq restart with 1;'
    );
  });
  /* ==============================  END CRUD FUNCTIONALITY  ============================== */
});
