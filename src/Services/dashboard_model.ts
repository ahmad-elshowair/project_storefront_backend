import client from "../database";

export class DashboardQueries{

  /* get all products that had been purchased */
  async purchasedProduct(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
      const results = await connect.query(sql);
      if (results.rows.length) {
        const products = results.rows;
        connect.release();
        return products;
      } else {
        throw new Error("no products had been purchased yet !");
      }
    } catch (error) {
      throw new Error(`failed to bring up ordered products: ${error}`);
    }
  }


  /* get all users who over made an order */
  async orderedUsers(): Promise<{ full_name: string, order_id: string }[]>{
    try {
      const connect = await client.connect();
      const sql =
			'SELECT CONCAT(first_name, " ", last_name) as "full_name", order_id FROM users INNER JOIN orders ON users.id = orders.user_id';
      const results = await connect.query(sql);
      if (results.rows.length) {
        const users = results.rows;
        connect.release();
        return users;
      } else {
        throw new Error('no a user made an order !');
      }
    } catch (error) {
      throw new Error(`Beep could not bring users who made orders: ${error}`);
    }
  }

  /*bring up 5 most expensive products */
  async expensiveProducts(): Promise<{name: string, price: number}[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT name, price FROM products WHERE price >= 1000 ORDER BY price DESC LIMIT 5';
      const results = await connect.query(sql);
      if (results.rows.length) {
        const products = results.rows;
        connect.release();
        return products;
      } else {
        throw new Error("no expensive products to bring !");
      }
    } catch (error) {
      throw new Error(`Beep failed to bring up any product: ${error}`);
    }
  }
  
}