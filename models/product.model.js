const db = require("./db");

const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.description = product.description;
  this.imagePath = product.imagePath;
};

//NOTE: result is a function with a signature: (err, data) => ...
// Inserts newProduct into the products table
Product.create = (newProduct, result) => {
  const query =
    "INSERT INTO products (name, price, description, imagePath) VALUES (?,?,?,?);";
  const params = [
    newProduct.name,
    newProduct.price,
    newProduct.description,
    newProduct.imagePath,
  ];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error("Error while inserting new product: ", err.message);
      result(err, null);
      return;
    }
    //NOTE: this could result in some errors. Don't know yet, whether this.lastID will work
    console.log("Created new Product: ", { id: this.lastID, ...newProduct });
    result(null, { id: this.lastID, ...newProduct });
  });
};

// Returns product data for a given product id
Product.getByID = (id, result) => {
  const query = "SELECT * FROM products WHERE id=?;";
  const params = [id];
  db.get(query, params, function (err, row) {
    if (err) {
      console.error("Error while finding product by id: ", err.message);
      result(err, null);
      return;
    }
    result(null, row);
  });
};

// Returns a list of all products that match the name
Product.getByName = (name, result) => {
  const query = "SELECT * FROM products WHERE name LIKE ?;";
  const params = [`%${name}%`];
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Error while getting products by name: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// Returns a list of all products whose description matches the input description
Product.getByDescription = (description, result) => {
  const query = "SELECT * FROM products WHERE description LIKE ?;";
  const params = [`%${description}%`];
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(
        "Error while getting products by description: ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

//NOTE: lower and upper are (inclusive) price ranges.
// Returns a list of all products, which price lies in between the bounds
Product.getByPrice = (lower, upper, result) => {
  const query = "SELECT * FROM products WHERE price BETWEEN ? AND ?;";
  const params = [lower, upper];
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Error while getting products by price: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// Returns a list of all products from the products table
Product.getAll = (result) => {
  const query = "SELECT * FROM Products;";
  db.all(query, function (err, rows) {
    if (err) {
      console.error("Error while getting all products: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

module.exports = Product;
