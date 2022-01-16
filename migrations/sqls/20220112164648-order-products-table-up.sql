CREATE TABLE order_products ( 
id INTEGER SERIAL PRIMARY KEY,
  quantity INTEGER,
order_id INTEGER REFERENCES orders(id),
product_id INTEGER REFERENCES products(id)
);