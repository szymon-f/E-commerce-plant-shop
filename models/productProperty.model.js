const db = require("./db");

const ProductProperty = function (productProperty) {
  this.productID = productProperty.productID;
  this.propertyName = productProperty.propertyName;
  this.propertyValue = productProperty.propertyValue;
};

// creates a new product property
ProductProperty.create = (newProductProperty, result) => {
  const query =
    "INSERT INTO productProperties (productID, propertyName, propertyValue) VALUES (?,?,?);";
  const params = [
    newProductProperty.productID,
    newProductProperty.propertyName,
    newProductProperty.propertyValue,
  ];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while inserting new product category : ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Created new product property: ", newProductProperty);
    result(null, newProductProperty);
  });
};

// returns a list of all product properties for a given productID
ProductProperty.getProductProperties = (productID, result) => {
  const query = "SELECT * FROM productProperties WHERE productID=?;";
  const params = [productID];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error(
        "Error while getting product properties (productProperties table)",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// updates the value of a propertyName for a given productID
ProductProperty.updatePropertyValue = (
  productID,
  propertyName,
  newValue,
  result
) => {
  const query =
    "UPDATE productProperties SET propertyValue=? WHERE productID=? AND propertyName=?;";
  const params = [newValue, productID, propertyName];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while updating product property (productProperties table): ",
        err.message
      );
      result(err, null);
      return;
    }
    if (this.changes == 0) {
      console.error(
        "Trying to update a product property for a productID, that doesn't exist"
      );
      result({ kind: "not_found", message: "productID not found" }, null);
      return;
    }
    result(null, newValue);
  });
};

// deletes a property for a given propertyName and productID
ProductProperty.deleteProperty = (productID, propertyName, result) => {
  const query =
    "DELETE FROM productProperties WHERE productID=? AND propertyName=?;";
  const params = [productID, propertyName];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while deleting a product property (productProperties table): ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log(
      `Deleted proprertyName ${propertyName} for productID ${productID}`
    );
    result(null, propertyName);
  });
};

module.exports = ProductProperty;
