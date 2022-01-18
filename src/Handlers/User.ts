/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { User, UserModel } from '../Models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authorizeUser, verifyAuthToken } from '../Services/auth';

dotenv.config();
const secret = process.env.TOKEN_SECRET as unknown as string;

const model = new UserModel();

const getUsers = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await model.index();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await model.show(userId);
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
    res.status(200).json(token);
  } catch (error) {
    throw new Error(`${error}`);
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
    throw new Error(`${error}`);
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
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({
      message: 'password incorrect !',
    });
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, getUsers);
  app.get('/get-user/:id', authorizeUser, getUserById);
  app.post('/create-user', createUser);
  app.put('/edit-user/:id', authorizeUser, editUser);
  app.delete('/delete-user/:id', authorizeUser, removeUser);
  app.post('/user-login', login);
};

export default user_routes;
