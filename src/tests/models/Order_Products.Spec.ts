import {
  Order_Products,
  OrderProductsModel,
} from '../../Models/Order_Products';
import { Product, ProductStore } from '../../Models/Product';
import { Order, OrderModel } from '../../Models/Order';
import { User, UserModel } from '../../Models/User';
import client from '../../database';

const modelOrder = new OrderModel();
const modelProduct = new ProductStore();
const modelOrderProducts = new OrderProductsModel();
const modelUser = new UserModel();

describe('TEST ORDER_PRODUCTS MODEL', () => {
  /* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */
  describe('are curd functions defined', () => {
    // define index method
    it('should defined index method', async () => {
      expect(modelOrderProducts.index).toBeDefined();
    });

    // define create method
    it('should defined create method', async () => {
      expect(modelOrderProducts.create).toBeDefined();
    });
  });
  /* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

  /* ==============================  BEGIN CURD FUNCTIONALITY  ============================== */
  describe('Test CURD functionality', () => {
    let product: Product;
    let order: Order;
    let orderProducts: Order_Products;
    beforeAll(async () => {
      const userData: User = {
        first_name: 'Thuy',
        last_name: 'Pham',
        email: 'thuy@email.com',
        password_digest: 'password',
      };
      const productData: Product = {
        name: 'Nokia 8.3',
        price: 1000,
      };
      const user: User = await modelUser.create(userData);
      const orderData: Order = {
        status: 'active',
        user_id: Number(user.id),
      };
      order = await modelOrder.create(orderData);
      product = await modelProduct.create(productData);
    });
    // test create method
    it('should create a new purchased product', async () => {
      orderProducts = await modelOrderProducts.create({
        quantity: 10,
        order_id: Number(order.id),
        product_id: Number(product.id),
      });
      expect(orderProducts.quantity).toEqual(10);
      expect(orderProducts.order_id).toEqual(Number(order.id));
      expect(orderProducts.product_id).toEqual(Number(product.id));
    });

    // test index method
    it('should return purchased products', async () => {
      const purchasedProducts = await modelOrderProducts.index();
      expect(purchasedProducts).toContain(orderProducts);
    });

    afterAll(async () => {
      const connect = await client.connect();
      const sqlOderProducts = 'DELETE FROM order_products';
      await connect.query(sqlOderProducts);
      const sqlOrder = 'DELETE FROM orders';
      await connect.query(sqlOrder);
      const sqlUser = 'DELETE FROM users';
      await connect.query(sqlUser);
      const sqlProduct = 'DELETE FROM products';
      await connect.query(sqlProduct);
      connect.release();
    });
  });
  /* ==============================  END CURD FUNCTIONALITY  ============================== */
});
