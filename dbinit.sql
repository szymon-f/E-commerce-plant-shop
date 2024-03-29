-- file, that can be used to initialize the database from scratch using some dummy data
-- usage: sqlite3 db.sqlite < dbinit.sql

CREATE TABLE products
  (id INTEGER PRIMARY KEY,
   name TEXT UNIQUE NOT NULL,
   price INTEGER NOT NULL,
   description TEXT,
   imagePath TEXT,
   inOffer INTEGER NOT NULL);

CREATE TABLE categories 
  (id INTEGER PRIMARY KEY,
   name TEXT UNIQUE NOT NULL);

CREATE TABLE categoryProperties
  (categoryID INTEGER NOT NULL,
   propertyName TEXT NOT NULL,
   FOREIGN KEY(categoryID) REFERENCES categories(id));

CREATE TABLE productCategories
  (productID INTEGER UNIQUE NOT NULL,
   categoryID INTEGER NOT NULL,
   FOREIGN KEY(productID) REFERENCES products(id),
   FOREIGN KEY(categoryID) REFERENCES categories(id));

CREATE TABLE productProperties
  (productID INTEGER NOT NULL,
   propertyName TEXT NOT NULL,
   propertyValue TEXT NOT NULL,
   FOREIGN KEY(productID) REFERENCES products(id));

CREATE TABLE users
  (userID INTEGER PRIMARY KEY,
   username TEXT NOT NULL UNIQUE,
   email TEXT NOT NULL,
   passwordHash TEXT NOT NULL UNIQUE);

CREATE TABLE admins
  (adminID INTEGER PRIMARY KEY,
   username TEXT NOT NULL UNIQUE,
   passwordHash TEXT NOT NULL UNIQUE);

CREATE TABLE orderProducts
  (orderID INTEGER NOT NULL, 
   productID INTEGER NOT NULL,
   quantity INTEGER NOT NULL,
   FOREIGN KEY(orderID) REFERENCES customerOrders(orderID),
   FOREIGN KEY(productID) REFERENCES products(id));

CREATE TABLE customerOrders
  (orderID INTEGER PRIMARY KEY,
   userID INTEGER NOT NULL,
   orderDate TEXT NOT NULL, -- ISO8601 format  - "YYYY-MM-DD HH:MM:SS"
   orderStatus TEXT NOT NULL, -- either "pending" or "shipped". Theoretically this column should be an integer that is mapped to its status in another table.
   FOREIGN KEY(userID) REFERENCES users(userID));

INSERT INTO products (name, price, description, imagePath, inOffer) VALUES ('Hiacynt', 700, 'Ten kwiat ma niezwykle okazałe kwiatostany, wysokości nawet 30cm, wydzielające intensywny i oryginaly zapach.', '', 1);
INSERT INTO products (name, price, description, imagePath, inOffer) VALUES ('Chryzantema', 1500, 'Opis chryzantem. Chryzantemy złociste są najlepsze.', '', 1);
INSERT INTO products (name, price, description, imagePath, inOffer) VALUES ('Doniczka Ratolla Round', 998, 'Piękna biała doniczka, idealna na parapet.', '', 1);

INSERT INTO categories (name) VALUES ('Kwiaty');
INSERT INTO categories (name) VALUES ('Doniczki');

INSERT INTO categoryProperties (categoryID, propertyName) VALUES (1, 'waga');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (1, 'kolor');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (1, 'wysokość');

INSERT INTO categoryProperties (categoryID, propertyName) VALUES (2, 'średnica');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (2, 'wysokość');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (2, 'waga');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (2, 'kolor');
INSERT INTO categoryProperties (categoryID, propertyName) VALUES (2, 'pojemność');

INSERT INTO productCategories (productID, categoryID) VALUES (1, 1);
INSERT INTO productCategories (productID, categoryID) VALUES (2, 1);
INSERT INTO productCategories (productID, categoryID) VALUES (3, 2);

INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (1, 'waga', '0.2');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (1, 'kolor', 'fioletowy');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (1, 'wysokość', '0.3');

INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (2, 'waga', '10');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (2, 'kolor', 'złocisty');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (2, 'wysokość', '0.6');

INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (3, 'średnica', '1.45');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (3, 'wysokość', '1.27');
INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (3, 'pojemnosc', '1.2');

-- user login and password: user
-- admin login and password: admin
INSERT INTO users (username, email, passwordHash) VALUES ('user', 'user@gmail.com', '$2b$10$Gx51k1WupfCIjFNXbPNKL.KZDt20PBYjw8DbhTMsaBYJe67wnfYsC');
INSERT INTO admins (username, passwordHash) VALUES ('admin', '$2b$10$g3BXkRlYYpDTM9IMOQFZX.eXM6rWQZmTVO0KC5dkxxeDECPvbQDiO');
INSERT INTO customerOrders (userID, orderDate, orderStatus) VALUES ((select userID from users limit 1), ('2023-12-20 21:22:44'), 'pending');

INSERT INTO orderProducts (orderID, productID, quantity) VALUES ((select orderID from customerOrders limit 1), 1, 3);
INSERT INTO orderProducts (orderID, productID, quantity) VALUES ((select orderID from customerOrders limit 1), 2, 1);
