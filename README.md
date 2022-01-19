# Storefront Backend Project

## **structure**
* migrations
  - sql
    * orders migrate up sql file
    * orders migrate down sql file
    * users migrate up sql file
    * users migrate down sql file
    * products migrate up sql file
    * products migrate down sql file
    * order_products migrate up sql file
    * orders-products migrate down sql file
  - orders table.js
  - products table.js
  - users table.js
  - order_products.js
* spec
  - support
    * jasmine.json
* src 
  - Handlers
    * Order_Products.ts
    * Order.ts
    * Product.ts
    * User.ts
  - Models
    * Order_Products.ts
    * Order.ts
    * Product.ts
    * User.ts
  - Services
    * dashboard_controller.ts
    * dashboard_model.ts
    * auth.ts
  - tests
    * Handlers
      - Order_Products.ts
      - Order.ts
      - Product.ts
      - User.ts
    * Models
      - Order_Products.ts
      - Order.ts
      - Product.ts
      - User.ts
  - server.ts
  - database.ts
* .env
* .gitignore
* .prettierrc
* .perttierignore
* .eslintrc.json
* database.json
* package-lock.json
* package.json
* README.md
* REQUIREMENTS.md
* tsconfig.json

## Setup the DB
###### create user
``
CREATE USER full_stack_user WITH PASSWORD 'pass1993';
``
###### create DB
`
CREATE DATABASE store_front;
`
`
CREATE DATABASE store_front_test;
`

###### grant all databases to the user
`
GRANT ALL PRIVILEGES ON DATABASE store_front TO full_stack_user;
`
`
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO full_stack_user;
`




## **environmental variables**
*to connect with the database use the following environmental variables:-*
- DB_PORT=      =====> the port of the database ===> 5432
- DB_HOST=      =====> the host 
- DB_NAME=      =====> name of the database
- DB_USER=      =====> the user name or the owner of the database
- DB_PASSWORD=  =====> password of the database
- PEPPER=       =====> pepper text to hash the password
- SALT_ROUND=   =====> how many round for salting the password
- TOKEN_SECRET= =====> secret text for token
- PORT=         =====> the server running on the port of 3000



## **scripts**
- dev             =====> nodemon package to run and refresh the server every time the code changed and saved
- migrate-up      =====> run all the migrations 
- migrate-down    =====> erase some of the migrations
- migrate-reset   =====> erase all the migration
- compile         =====> to compile TS files to JS files into dist Dir
- start           =====> run the server
- test            =====> only test the suites test with jasmine
- watch           =====> watch the code 
- test-migrate    =====> migrate up all migrations files && test suites test && erase all migrations files
- lint            =====> get any error with syntax stylish using eslint configurations
- lint-fix        =====> fix all the error of syntax stylish
- format          =====> formate code stylish using prettier configurations

## **package installation**
- run npm install || yarn 

## Jasmine configurations are set to
- dir             ======> src/tests
- extension files ======> .ts
- random          ======> false