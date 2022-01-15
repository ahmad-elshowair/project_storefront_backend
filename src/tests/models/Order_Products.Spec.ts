import { Order_Products, OrderProductsModel } from "../../Models/Order_Products";
import { Product, ProductStore } from '../../Models/Product';
import { Order, OrderModel } from "../../Models/Order";

const modelOrder = new OrderModel();
const modelProduct = new ProductStore();
const modelOrderProducts = new OrderProductsModel();

const productData: Product = {
  name: "Nokia 8.3",
  price: 1000
};

const orderData: Order = {
  
}

const orderProductsData: Order_Products = {
  quantity: 10,
  order_id: 1,
  product_id: 1
};

let orderProducts: Order_Products;