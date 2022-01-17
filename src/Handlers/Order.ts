import { Order, OrderModel } from '../Models/Order';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { User } from "../Models/Users";
dotenv.config();

const { TOKEN_SECRET } = process.env;

const model = new OrderModel();

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

const getOrders = async (_req: express.Request, res: express.Response) => {
  try {
    // let user: User;
    const orders = await model.index();
    res.status(200).json(orders);
    // res.status(200).json(orders.filter(order => order.user_id === user.id));
  } catch (error) {
    throw new Error(`an error just occurred ${error}`);
  }
};

const getOrder = async (req: express.Request, res: express.Response) => {
  try {
    const order_id = parseInt(req.params.id);
    const order = await model.show(order_id);
    res.status(200).json(order);
  } catch (error) {
    throw new Error(`an error just occurred ${error}`);
  }
};

const createOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { status, user_id } = req.body;
    if (status === undefined || user_id === undefined) {
      res.status(401).json({
        message: 'status and user_id are required inputs',
      });
    }
    const order: Order = {
      status,
      user_id,
    };
    const newOrder = await model.create(order);
    res.send(200).json({
      message: 'order has created successfully',
      order: newOrder,
    });
    console.log(newOrder);
  } catch (error) {
    throw new Error(
      `error just occurred could not able to create an order ${error}`
    );
  }
};

const editOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const status = req.body;
    const user_id = parseInt(req.body);
    const id = parseInt(req.params.id);

    if (id === undefined || status === undefined || user_id === undefined) {
      res.status(400).json({
        message: 'the inputs of the order are required and must be valid',
      });
    }
    const order: Order = {
      status,
      user_id,
      id,
    };
    const editedOrder = await model.update(order);
    res.status(200).json({
      message: 'order has edited successfully',
      product: editedOrder,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteOrder = async (req: express.Request, res: express.Response) => {
  const orderId = parseInt(req.params.id);
  if (orderId === undefined) {
    res.status(401).json({ message: 'order id is required' });
  }
  try {
    const deletedOrder = await model.delete(orderId);
    if (deletedOrder === null) {
      res.status(401).json({
        message: 'invalid input !',
      });
    } else {
      res.status(200).json({
        message: 'order has been deleted successfully',
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const order_routes = (app: express.Application) => {
  // routes of the orders table
  app.get('/orders', verifyAuthToken, getOrders);
  app.get('/orders/:id', verifyAuthToken, getOrder);
  app.post('/orders', verifyAuthToken, createOrder);
  app.put('/orders/:id', verifyAuthToken, editOrder);
  app.delete('/orders/:id', verifyAuthToken, deleteOrder);
};

export default order_routes;
