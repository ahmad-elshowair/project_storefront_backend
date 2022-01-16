import express from 'express';
import { Order_Products, OrderProductsModel } from '../Models/Order_Products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const model = new OrderProductsModel();

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1] as unknown as string;
    if (token === null) return res.status(401);
    jwt.verify(token, TOKEN_SECRET as unknown as string);
  } catch (error) {
    res.status(401).json({
      message: 'access denied you must sign up or login',
      error: error,
    });
  }
  next();
};

const purchaseProduct = async (req: express.Request, res: express.Response) => {
  try {
    const order_id = parseInt(req.params.id);
    const product_id = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
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
  app.post('/orders/:id/products', verifyAuthToken, purchaseProduct);
  app.get('/order-products', verifyAuthToken, getOrderProducts);
};

export default order_products_routes;
