import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM orders';
      const results = await connect.query(sql);
      const orders = results.rows;
      connect.release();
      return orders;
    } catch (error) {
      throw new Error(`could bot bring any order ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM orders  WHERE id = ($1)';
      const results = await connect.query(sql, [id]);
      if (!results.rows.length) {
        throw new Error('the order is not excite !');
      } else {
        const order = results.rows[0];
        connect.release();
        return order;
      }
    } catch (error) {
      throw new Error(`Beep an error just occurred ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connect = await client.connect();
      const checkOrder = 'SELECT * FROM orders WHERE id =($1)';
      const resultCheck = await connect.query(checkOrder, [order.id]);

      // check if the order is already excite
      if (resultCheck.rows.length) {
        throw new Error('the order is already excite !');
      } else {
        const sql =
          'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
        const results = await connect.query(sql, [order.status, order.user_id]);
        const newOrder = results.rows[0];
        connect.release();
        return newOrder;
      }
    } catch (error) {
      throw new Error(`Beep an error just occurred ${error}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const connect = await client.connect();

      const sqlCheck = 'SELECT * FROM orders WHERE id = ($1)';
      const resultCheck = await connect.query(sqlCheck, [order.id]);
      if (!resultCheck.rows.length) {
        throw new Error("the order doesn't excite");
      } else {
        const sql =
          'UPDATE orders SET status = ($1), user_id =($2) WHERE id = ($3) RETURNING *';
        const results = await connect.query(sql, [
          order.status,
          order.user_id,
          order.id,
        ]);
        const updateOrder = results.rows[0];
        connect.release();
        return updateOrder;
      }
    } catch (error) {
      throw new Error(
        `Beep cannot edit order ${order.id} due to that: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connect = await client.connect();
      const sqlCheck = 'SELECT * FROM orders WHERE id =($1)';
      const resultCheck = await connect.query(sqlCheck, [id]);
      if (!resultCheck.rows.length) {
        throw new Error('order does not excite !');
      } else {
        const sql = 'DELETE FROM orders WHERE id = ($1)';
        const results = await connect.query(sql, [id]);
        const deletedOrder = results.rows[0];
        connect.release();
        return deletedOrder;
      }
    } catch (error) {
      throw new Error(
        `Beep failed to delete the the order due to that ${error}`
      );
    }
  }
}
