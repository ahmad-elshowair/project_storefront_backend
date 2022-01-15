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
    *jasmine.json
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
* database.json
* package-lock.json
* package.json
* README.md
* REQUIREMENTS.md
* tsconfig.json

*to connect with the database use the following environmental variables*
## **environmental variables**
- DB_HOST= the host 
- DB_NAME= name of the database
- DB_USER= the user name or the owner of the database
- DB_PASSWORD= password of the database
- PEPPER= pepper text to hash the password
- SALT_ROUND= how many round for salting the password
- TOKEN_SECRET= secret text or token
- PORT= the server running on the port of 8000

## **scripts**
- dev             =====> dev package to run and refresh the server of time the code changed just after save the code
- migrate-up      =====> run all the migrations 
- migrate-down    =====> erase some of the migrations
- migrate-reset   =====> erase all the migration
- compile         =====> to compile TS files to JS files into dist Dir
- start           =====> run the server
- test            =====> only test the suites test with jasmine
- watch           =====> watch the code 
- test-migrate    =====> migrate up all migrations files && test suites test && erase all migrations files

## **package installation**
- run npm install || yarn 