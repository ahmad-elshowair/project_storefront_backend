import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connect.query(sql);
      if (result.rowCount === 0) {
        throw new Error('there are no products to bring');
      } else {
        const products = result.rows;
        connect.release();
        return products;
      }
    } catch (error) {
      throw new Error(
        `Beep failed to get any product due to that error ${error}`
      );
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql = 'SELECT * FROM products WHERE id =($1)';
      const results = await connect.query(sql, [id]);
      if (results.rows.length) {
        const product = results.rows[0];
        connect.release();
        return product;
      } else {
        throw new Error('the product is not excite!');
      }
    } catch (error) {
      throw new Error(`Beep failed to get the user due to that ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connect = await client.connect();

      const CheckProduct = 'SELECT p FROM products p WHERE P.name = ($1)';
      const resultCheck = await connect.query(CheckProduct, [product.name]);
      if (resultCheck.rows.length) {
        throw new Error(`the product of ${product.name} is already excite !`);
      } else {
        const sql =
          'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
        const results = await connect.query(sql, [product.name, product.price]);
        const newProduct = results.rows[0];
        connect.release();
        return newProduct;
      }
    } catch (error) {
      throw new Error(
        `Beep cannot create a product ${product.name} due to that error ${error}`
      );
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connect = await client.connect();

      const sqlCheck = 'SELECT * FROM products WHERE id = ($1)';
      const resultCheck = await connect.query(sqlCheck, [product.id]);
      if (!resultCheck.rows.length) {
        throw new Error("the product doesn't excite");
      } else {
        const sql =
          'UPDATE products SET name = ($1), price =($2) WHERE id = ($3) RETURNING *';
        const results = await connect.query(sql, [
          product.name,
          product.price,
          product.id,
        ]);
        const updateProduct = results.rows[0];
        connect.release();
        return updateProduct;
      }
    } catch (error) {
      throw new Error(
        `Beep cannot edit product ${product.name} due to that error ${error}`
      );
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connect = await client.connect();
      const sqlCheck = 'SELECT * FROM products WHERE id =($1)';
      const resultCheck = await connect.query(sqlCheck, [id]);
      if (!resultCheck.rows.length) {
        throw new Error('product does not excite !');
      } else {
        const sql = 'DELETE FROM products WHERE id = ($1) RETURNING *';
        const results = await connect.query(sql, [id]);
        const deletedProduct = results.rows[0];
        connect.release();
        return deletedProduct;
      }
    } catch (error) {
      throw new Error(
        `Beep failed ro delete the product due to that error${error}`
      );
    }
  }
}
