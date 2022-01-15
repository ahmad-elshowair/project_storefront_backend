import express, {Request, Response, Application} from 'express';
import { Product, ProductStore } from '../Models/Product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

// enable the usage of dotenv
dotenv.config();

// get the secret token
const { TOKEN_SECRET } = process.env;

// an object of ProductStore
const model = new ProductStore();


const verifyAuthToken = (req: Request, res: Response, next: () => void): void => {
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


const getProducts = async (_req: Request, res: Response) => {
  try {
		const products = await model.index();
		res.status(200).json(products);
  } catch (error) {
		throw new Error(`${error}`);
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
		const product = await model.show(req.params.id);
		res.status(200).json(product);
  } catch (error) {
		throw new Error(`${error}`);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
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

const editProduct = async (req: Request, res: Response): Promise<void> => {
	try {
    const { name, price } = req.body;
    const id = parseInt(req.params.id);

		if (id === undefined || name === undefined || price === undefined) {
			res.status(400).json({
				message:
					'the inputs of the product are required and must be valid',
			});
		}
		const product: Product = {
			name,
      price,
      id 
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

const deleteProduct = async (req: Request, res: Response) => {
  const productId =  parseInt(req.params.id);
  if(productId === undefined){res.status(401).json({message: "product id is required"})}
  try {
    const deletedProduct = await model.delete(productId);
    if (deletedProduct === null) {
      res.status(401).json({
        message: 'invalid input !'
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

const product_routes = (app: Application)=>{
  app.get('/products', getProducts);
  app.get('/products/:id', getProductById);
  app.post('/products', verifyAuthToken, addProduct);
  app.put('/products/:id', verifyAuthToken, editProduct);
  app.delete('/products/:id', verifyAuthToken, deleteProduct);
}

export default product_routes;