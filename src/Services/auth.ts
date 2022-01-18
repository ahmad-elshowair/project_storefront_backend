import express from 'express';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../Models/User';

dotenv.config();

const secret = process.env.TOKEN_SECRET as unknown as string;
let user: User;

// verify user
export const authorizeUser = (
  req: express.Request,
  _res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1] as string;
    const decoded: JwtPayload = jwt.verify(token, secret);
    if (decoded.user.id !== user.id)
      _res.status(401).json('user does not match');

    next();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// verify token
export const verifyAuthToken = (
  req: express.Request,
  _res: express.Response,
  next: () => void
): void => {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1] as unknown as string;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
