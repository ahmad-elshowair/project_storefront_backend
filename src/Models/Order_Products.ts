import client from '../database';

export type Order_Products = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderProductsModel {
  async create(orderProducts: Order_Products): Promise<Order_Products> {
    try {
      const checkOrder = 'SELECT * FROM orders WHERE id = ($1)';
      const connect = await client.connect();
      const orderResults = await connect.query(checkOrder, [
        orderProducts.order_id,
      ]);
      if (orderResults.rows.length) {
        const order = orderResults.rows[0];
        if (order.status !== 'active') {
          throw new Error(
            `cannot add product ${orderProducts.product_id} to order ${orderProducts.order_id} because it is ${order.status}`
          );
        }
      } else {
        throw new Error('the order is not excite');
      }
    } catch (error) {
      throw new Error(`an error just occurred ${error}`);
    }
    try {
      const connect = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const results = await connect.query(sql, [
        orderProducts.quantity,
        orderProducts.order_id,
        orderProducts.product_id,
      ]);
      const product = results.rows[0];
      connect.release();
      return product;
    } catch (error) {
      throw new Error(
        `could not able to add product ${orderProducts.product_id} to order ${orderProducts.order_id}: ${error}`
      );
    }
  }

  async index(): Promise<Order_Products[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM order_products';
      const results = await connect.query(sql);
      const order_products = results.rows;
      connect.release();
      return order_products;
    } catch (error) {
      throw new Error(
        `Beep could not be able to bring any order_products: ${error}`
      );
    }
  }
}
