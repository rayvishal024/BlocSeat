-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(235) UNIQUE,
  password VARCHAR(100)
);

-- seats table
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  isbooked INT DEFAULT 0,
  user_id INT
);