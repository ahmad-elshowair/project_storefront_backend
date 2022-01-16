CREATE TABLE users(
id INTEGER SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  password_digest VARCHAR
);