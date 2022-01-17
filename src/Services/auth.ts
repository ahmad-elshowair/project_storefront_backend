import express from 'express';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../Models/User';

dotenv.config();

const secret = process.env.TOKEN_SECRET as unknown as string;
let user: User;

export const authorizeUser = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1] as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (decoded.id !== user.id) {
      throw new Error('user does not match');
    }
  } catch (error) {
    res.status(401).json(error);
  }
  next();
};

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1] as unknown as string;
    jwt.verify(token, secret);
  } catch (error) {
    res.status(401).json({
      message: 'access denied you must sign up or login',
      error: error,
    });
  }
  next();
};
