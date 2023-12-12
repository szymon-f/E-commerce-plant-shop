const db = require("./db");

const ProductCategory = function (productCategory) {
  this.productID = productCategory.productID;
  this.categoryID = productCategory.categoryID;
};

// creates a new product category
ProductCategory.create = (newProductCategory, result) => {
  const query =
    "INSERT INTO productCategories (productID, categoryID) VALUES (?,?);";
  const params = [newProductCategory.productID, newProductCategory.categoryID];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while inserting new product category : ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Created new category property: ", newProductCategory);
    result(null, newProductCategory);
  });
};

// returns categoryID associated with a given productID
ProductCategory.getCategoryIDByProductID = (productID, result) => {
  const query = "SELECT * FROM productCategories WHERE productID=?;";
  const params = [productID];
  db.get(query, params, function (err, row) {
    if (err) {
      console.error(
        "Error while getting categoryID by ProductID (productCategories table): ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, row);
  });
};

// returns all products for a given categoryID
ProductCategory.getAllProductsByCategoryID = (categoryID, result) => {
  const query = "SELECT * FROM productCategories WHERE categoryID=?;";
  const params = [categoryID];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error(
        "Error while getting productIDs by categoryID (productCategories table): ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// updates the product category
ProductCategory.updateProductCategory = (productID, newCategoryID, result) => {
  const query = "UPDATE productCategories SET categoryID=? WHERE productID=?;";
  const params = [newCategoryID, productID];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while updating product category (productCategories table): ",
        err.message
      );
      result(err, null);
      return;
    }
    if (this.changes == 0) {
      console.error(
        "Trying to update a product category for a productID, that doesn't exist"
      );
      result({ kind: "not_found", message: "productID not found" }, null);
      return;
    }
    result(null, newCategoryID);
  });
};

module.exports = ProductCategory;
