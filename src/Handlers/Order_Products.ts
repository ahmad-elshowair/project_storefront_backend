import express from 'express';
import { Order_Products, OrderProductsModel } from '../Models/Order_Products';
import { verifyAuthToken } from '../Services/auth';

const model = new OrderProductsModel();

const purchaseProduct = async (req: express.Request, res: express.Response) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    if (
      order_id === undefined ||
      product_id === undefined ||
      quantity === undefined
    ) {
      res.status(401).json({
        message: ' quantity, order_id and product_id are required inputs !',
      });
    }
    const orderProducts: Order_Products = {
      order_id,
      product_id,
      quantity,
    };
    const product = await model.create(orderProducts);
    res.status(200).json({
      message: `product ${product_id} has been added to the order ${order_id} successfully`,
      product: product,
    });
  } catch (error) {
    throw new Error(`could not add product to the order: ${error}`);
  }
};

const getOrderProducts = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const order_products = await model.index();
    res.status(200).json(order_products);
  } catch (error) {
    throw new Error(`cannot get any order products: ${error}`);
  }
};

const order_products_routes = (app: express.Application) => {
  app.post('/purchase-product', verifyAuthToken, purchaseProduct);
  app.get('/order-products', verifyAuthToken, getOrderProducts);
};

export default order_products_routes;
