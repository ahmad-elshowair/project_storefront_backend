import { Order, OrderModel } from '../../Models/Order';
import { User, UserModel } from '../../Models/User';
import client from '../../database';

const modelOrder = new OrderModel();
const modelUser = new UserModel();

/* ============================== START UNIT TEST ============================== */
describe('TEST ORDER MODEL', () => {
  /* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */
  describe('check crud functions', () => {
    it('index method should be declared', () => {
      expect(modelOrder.index).toBeDefined();
    });

    it('show method should be declared', () => {
      expect(modelOrder.show).toBeDefined();
    });

    it('create method should be declared', () => {
      expect(modelOrder.create).toBeDefined();
    });

    it('update method should be declared', () => {
      expect(modelOrder.update).toBeDefined();
    });

    it('delete method should be declared', () => {
      expect(modelOrder.delete).toBeDefined();
    });
  });
  /* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

  /* ==============================  BEGIN CRUD FUNCTIONALITY ============================== */
  /* create a user before all  */

  describe('Test CRUD functionality', () => {
    let user: User;
    let orderData: Order;
    beforeAll(async () => {
      const userData: User = {
        first_name: 'Thuy',
        last_name: 'Pham',
        email: 'thuy@email.com',
        password_digest: 'password',
      };
      user = await modelUser.create(userData);
    });

    /* test create order method functionality*/
    it('should create a new order', async () => {
      orderData = await modelOrder.create({
        status: 'active',
        user_id: Number(user.id),
      });
      expect(orderData.status).toEqual('active');
      expect(orderData.user_id).toEqual(Number(user.id));
    });

    /* test order index method functionality */
    it('index method should return orders', async () => {
      const orders = await modelOrder.index();
      expect(orders).toContain(orderData);
    });

    /* test show order method functionality */
    it('should get an order', async () => {
      const order = await modelOrder.show(orderData.id as number);
      expect(order).toEqual(orderData);
    });

    // test update order method functionality
    it('should update an order', async () => {
      const updateData: Order = {
        id: orderData.id,
        status: 'closed',
        user_id: user.id as number,
      };
      const updatedOrder = await modelOrder.update(updateData);
      expect(updatedOrder.status).toEqual('closed');
    });

    // test deleting the oder
    it('should delete the order', async () => {
      await modelOrder.delete(orderData.id as unknown as number);
      const orders = await modelOrder.index();
      expect(orders).toEqual([]);
    });

    /* after all specs done delete the order and the user*/
    afterAll(async () => {
      const connect = await client.connect();
      const sqlOrder = 'DELETE FROM orders';
      await connect.query(sqlOrder);
      const sqlUser = 'DELETE FROM users';
      await connect.query(sqlUser);
      connect.release();
    });
  });
  /* ==============================  END CRUD FUNCTIONALITY  ============================== */
});
/* ============================== END SUITE TEST ============================== */
