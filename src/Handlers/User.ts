/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { User, UserModel } from '../Models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET as unknown as string;

const model = new UserModel();

const authorizeUser = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: '',
    last_name: '',
    email: '',
    password_digest: '',
  };
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

const getUsers = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await model.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      Message: 'not able to get users',
    });
  }
};

const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    const user = await model.show(req.params.id);
    res.status(200).json({ ' the user': user });
  } catch (error) {
    res.status(400).json({
      message: 'the user is not excite',
    });
  }
};

const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_digest: req.body.password,
    };
    const create = await model.create(user);

    const token = jwt.sign({ user: create }, secret);
    res.status(200).json({
      message: 'a user has created',
      user: create,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      Message: 'cannot create a new user or the user is already excite !',
    });
  }
};

const editUser = async (req: express.Request, res: express.Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_digest: req.body.password,
  };
  try {
    const editedUser = await model.update(user);
    res.status(200).json({
      message: 'user edited successfully',
      user: editedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: 'cannot update the user',
    });
  }
};

const removeUser = async (req: express.Request, res: express.Response) => {
  const userId = parseInt(req.params.id);
  if (userId === undefined) {
    res.status(401).json({ message: 'user id is required' });
  }
  try {
    const deletedUser = await model.delete(userId);
    if (deletedUser === null) {
      res.status(401).json({
        message: 'user does not excite !',
      });
    } else {
      res.status(200).json({
        message: 'the user successfully deleted',
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const signIn = await model.login(email, password);
    const token = jwt.sign({ email, password }, secret);
    res.status(200).json({
      message: 'successfully login',
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: 'password incorrect !',
    });
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', authorizeUser, getUsers);
  app.get('/users/:id', authorizeUser, getUserById);
  app.post('/users', createUser);
  app.put('/users/:id', authorizeUser, editUser);
  app.delete('/users/:id', authorizeUser, removeUser);
  app.post('/users/login', login);
};

export default user_routes;
