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

Category.updateName = (categoryID, newName, result) => {
  const query = "UPDATE categories SET name=? WHERE categoryID=?;";
  const params = [newName, categoryID];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error("Error while trying to update category name");
      result(err, null);
      return;
    }
    if (this.changes == 0) {
      console.error(
        "Trying to update a category name for a categoryID, that doesn't exist"
      );
      result({ kind: "not_found", message: "catgoryID not found" });
      return;
    }
    result(null, newName);
  });
};

Category.deleteCategory = (categoryID, result) => {
  const query = "DELETE FROM category WHERE categoryID=?;";
  const params = [categoryID];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error("Error while deleting a category: ", err.message);
      result(err, null);
      return;
    }
    console.log(`Deleted category with categoryID ${categoryID}`);
    result(null, categoryID);
  });
};

module.exports = Category;
