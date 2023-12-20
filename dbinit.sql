-- file, that can be used to initialize the database from scratch using some dummy data
-- usage: sqlite3 db.sqlite < dbinit.sql

CREATE TABLE products
  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   name TEXT UNIQUE NOT NULL,
   price INTEGER NOT NULL,
   description TEXT,
   imagePath TEXT,
   inOffer INTEGER NOT NULL);

CREATE TABLE categories 
  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
  (userID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   username TEXT NOT NULL UNIQUE,
   email TEXT NOT NULL,
   passwordHash TEXT NOT NULL UNIQUE);

CREATE TABLE admins
  (adminID INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
   username TEXT NOT NULL UNIQUE,
   passwordHash TEXT NOT NULL UNIQUE);

--NOTE: add orers table here

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
