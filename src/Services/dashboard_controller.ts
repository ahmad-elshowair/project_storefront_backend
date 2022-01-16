import express from 'express';
import { DashboardQueries } from './dashboard_model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const dashboard = new DashboardQueries();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1] as unknown as string;
    jwt.verify(token, TOKEN_SECRET as unknown as string);
  } catch (error) {
    res.status(401).json({
      message: 'access denied you must sign up or login',
      error: error,
    });
  }
  next();
};

const purchased_products = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const products = await dashboard.purchasedProduct();
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const usersOrdered = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await dashboard.orderedUsers();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const expensiveProducts = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const products = await dashboard.expensiveProducts();
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const dashboard_routes = (app: express.Application) => {
  app.get('/purchased-products', verifyAuthToken, purchased_products);
  app.get('/users-ordered', verifyAuthToken, usersOrdered);
  app.get('/expensive-products', verifyAuthToken, expensiveProducts);
};

export default dashboard_routes;
