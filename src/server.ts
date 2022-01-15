import express from 'express';
import dotenv from 'dotenv';
import product_routes from './Handlers/Product';
import user_routes from './Handlers/User';
import order_routes from './Handlers/Order';
import dashboard_routes from './Services/dashboard_controller';
import order_products_routes from './Handlers/Order_Products';


dotenv.config();

// an instance app of express
const app: express.Application = express();

// declare the port of the host 
const port = process.env.PORT ||8000;

// initialize the app to use json 
app.use(express.json());

// display a message at the main route
app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({
    message: "hello world message from the main route"
  })
});

user_routes(app);
product_routes(app);
order_routes(app);
order_products_routes(app);
dashboard_routes(app);

// listen to the app on the port of 8000
app.listen(port, () => {
  console.log(`the app works on http://localhost:${port} `);
});

export default app;