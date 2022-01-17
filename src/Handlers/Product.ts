import express from 'express';
import { Product, ProductStore } from '../Models/Product';
import { verifyAuthToken } from '../Services/auth';

// an object of ProductStore
const model = new ProductStore();

const getProducts = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await model.index();
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getProductById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const product = await model.show(productId);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const addProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await model.create(product);
    res.status(200).json({
      message: 'product has created successfully',
      product: newProduct,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const editProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { name, price } = req.body;
    const id = parseInt(req.params.id);

    if (id === undefined || name === undefined || price === undefined) {
      res.status(400).json({
        message: 'the inputs of the product are required and must be valid',
      });
    }
    const product: Product = {
      name,
      price,
      id,
    };
    const editedProduct = await model.update(product);
    res.status(200).json({
      message: 'product has edited successfully',
      product: editedProduct,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteProduct = async (req: express.Request, res: express.Response) => {
  const productId = parseInt(req.params.id);
  if (productId === undefined) {
    res.status(401).json({ message: 'product id is required' });
  }
  try {
    const deletedProduct = await model.delete(productId);
    if (deletedProduct === null) {
      res.status(401).json({
        message: 'invalid input !',
      });
    } else {
      res.status(200).json({
        message: 'product has been deleted successfully',
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', getProducts);
  app.get('/products/:id', getProductById);
  app.post('/products', verifyAuthToken, addProduct);
  app.put('/products/:id', verifyAuthToken, editProduct);
  app.delete('/products/:id', verifyAuthToken, deleteProduct);
};

export default product_routes;
