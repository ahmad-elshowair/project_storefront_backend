# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

# API Endpoints
## Products

- Index 
  * Parameters        ===> NO
  * Token required    ===> NO
  * Usage             ===> list all exciting products
  * Request           ===> GET
  * http://localhost:3000/prodtucs

- Show 
  * Parameters        ===> id
  * Token required    ===> NO
  * Usage             ===> list a specific product
  * Request           ===> GET
  * http://localhost:3000/get-product/:id

- Create
  * Parameters        ===> name , price
  * Token required    ===> Bearer <token>
  * Usage             ===> add new product
  * Request           ===> POST
  * http://localhost:3000/create-product

- Update
  * Parameters        ===> id, name , price
  * Token required    ===> Bearer <token>
  * Usage             ===> edit an exciting product
  * Request           ===> PUt
  * http://localhost:3000/edit-product/:id


- Delete
  * Parameters        ===> id
  * Token required    ===> Bearer <token>
  * Usage             ===> Delete an exciting product
  * Request           ===> DELETE
  * http://localhost:3000/delete-product/:id





## Users

- Index 
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> list all exciting Users
  * Request           ===> GET
  * http://localhost:3000/users

- Show 
  * Parameters        ===> id
  * Token required    ===> Bearer <token>
  * Usage             ===> list a specific User
  * Request           ===> GET
  * http://localhost:3000/get-user/:id

- Create
  * Parameters        ===> first_name, last_name, email, password_digest
  * Token required    ===> No
  * Usage             ===> create a new User
  * Request           ===> POST
  * http://localhost:3000/create-user

- Update
  * Parameters        ===> id, first_name, last_name, email, password_digest
  * Token required    ===> Bearer <token>
  * Usage             ===> edit an exciting User
  * Request           ===> PUT
  * http://localhost:3000/edit-user/:id


- Delete
  * Parameters        ===> id
  * Token required    ===> Bearer <token>
  * Usage             ===> Delete an exciting User
  * Request           ===> DELETE
  * http://localhost:3000/delete-user/:id

- Login
  * Parameters        ===> email, password
  * Token required    ===> NO
  * Usage             ===> login user
  * Request           ===> POST
  * http://localhost:3000/login-user




## Orders

- Index 
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> list all exciting Orders
  * Request           ===> GET
  * http://localhost:3000/orders

- Show 
  * Parameters        ===> id
  * Token required    ===> Bearer <token>
  * Usage             ===> list a specific Order
  * Request           ===> GET
  * http://localhost:3000/get-order/:id

- Create
  * Parameters        ===> status, user_id
  * Token required    ===> Bearer <token>
  * Usage             ===> create new order
  * Request           ===> POST
  * http://localhost:3000/create-order

- Update
  * Parameters        ===> id, status
  * Token required    ===> Bearer <token>
  * Usage             ===> edit an exciting Order
  * Request           ===> PUT
  * http://localhost:3000/edit-order/:id


- Delete
  * Parameters        ===> id
  * Token required    ===> Bearer <token>
  * Usage             ===> Delete an exciting product
  * Request           ===> DELETE
  * http://localhost:3000/delete-order/:id




## Order_Products
- Index 
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> list all purchased products
  * Request           ===> GET
  * http://localhost:3000/orders-products

  - Create 
  * Parameters        ===> order_id, product_id, quantity
  * Token required    ===> Bearer <token>
  * Usage             ===> purchase a product
  * Request           ===> POST
  * http://localhost:3000/purchase-product


## Dashboard 
- Purchased Products
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> bring up all products that had been purchased
  * Request           ===> GET
  * http://localhost:3000/purchased-products


- Ordered Users
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> bring up all uses who had been purchased a product
  * Request           ===> GET
  * http://localhost:3000/users-ordered


- Expensive Products
  * Parameters        ===> NO
  * Token required    ===> Bearer <token>
  * Usage             ===> bring up all the expensive products that are over 1000
  * Request           ===> GET
  * http://localhost:3000/expensive-products




## Data Schema
### Product
-  id   ====> serial primary key
- name  ====> varchar(100)
- price ====> integer

### User
- id          ====> serial primary key
- first_name  ====> varchar (50)
- last_name   ====> varchar (50)
- email       ====> varchar (255)
- password    ====> varchar

### Orders
- id       =====> serial primary key
- status   =====> varchar(10)
- user_id  =====> bigint FK references users (id)


### Order_products
- id         ====> serial primary key
- quantity   ====> integer
- order_id   ====> bigint FK references orders (id)
- product_id ====> bigint FK references products (id)
 
