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
    /* declare variables to will be assigned later within this describe block */
    let product: Product;
    let order: Order;
    let orderProducts: Order_Products;

    /* before all specs create foreign key's tables  */
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
      // create a user
      const user: User = await modelUser.create(userData);

      const orderData: Order = {
        status: 'active',
        user_id: user.id as unknown as number,
      };

      // create a product
      product = await modelProduct.create(productData);

      // creat an order
      order = await modelOrder.create(orderData);
    });

    // test create order products method
    it('should create a new purchased product', async () => {
      orderProducts = await modelOrderProducts.create({
        quantity: 10,
        order_id: order.id as unknown as number,
        product_id: product.id as unknown as number,
      });
      expect(orderProducts.quantity).toEqual(10);
      expect(orderProducts.order_id).toEqual(order.id as unknown as number);
      expect(orderProducts.product_id).toEqual(product.id as unknown as number);
    });

    // test index order products method
    it('should return purchased products', async () => {
      const purchasedProducts = await modelOrderProducts.index();
      expect(purchasedProducts).toContain(orderProducts);
    });

    /* after all spec delete the data from all tables */
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
