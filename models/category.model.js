const db = require("./db");

const Category = function (category) {
  this.name = category.name;
};

// Inserts newCategory into the categories table
Category.create = (newCategory, result) => {
  const query = "INSERT INTO categories (name) VALUES (?);";
  const params = [newCategory.name];
  db.run(query, params, (err, res) => {
    if (err) {
      console.error("Error while inserting new category: ", err.message);
      result(err, null);
      return;
    }
    console.log("Inserted new category: ", { id: this.lastID, ...newCategory });
    result(null, { id: this.lastID, ...newCategory });
  });
};

// Returns category data for a given category id
Category.getByID = (id, result) => {
  const query = "SELECT * FROM categories WHERE id=?;";
  const params = [id];
  db.get(query, params, (err, row) => {
    if (err) {
      console.error("Error while getting category by id: ", err.message);
      result(err, null);
      return;
    }
    result(null, row);
  });
};

// Returns category data for a given category name
Category.getByName = (name, result) => {
  const query = "SELECT * FROM categories WHERE name LIKE ?;";
  const params = [`%${name}%`];
  db.get(query, params, (err, row) => {
    if (err) {
      console.error("Error while getting category by name: ", err.message);
      result(err, null);
      return;
    }
    result(null, row);
  });
};

// Returns a list of all categories from the categories table
Category.getAll = (result) => {
  const query = "SELECT * FROM categories;";
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error while getting all categories: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

module.exports = Category;