const db = require("./db");

const CategoryProperty = function (categoryProperty) {
  this.categoryID = categoryProperty.categoryID;
  this.propertyName = categoryProperty.propertyName;
};

// Creates a new property for an already existing category
CategoryProperty.create = (newCategoryProperty, result) => {
  const query =
    "INSERT INTO categoryProperties (categoryID, propertyName) VALUES (?,?);";
  const params = [
    newCategoryProperty.categoryID,
    newCategoryProperty.propertyName,
  ];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Error while inserting new category property: ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Created new category property: ", newCategoryProperty);
    result(null, newCategoryProperty);
  });
};

// returns a list of all property names for a given categoryID
CategoryProperty.getPropertyNamesByCategoryID = (categoryID, result) => {
  const query = "SELECT * FROM categoryProperties WHERE categoryID=?;";
  const params = [categoryID];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error(
        "Error while getting property names by category ID: ",
        err.message
      );
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// updates propertyName for a given categoryID
CategoryProperty.updatePropertyName = (
  categoryID,
  oldPropertyName,
  newPropertyName,
  result
) => {
  const query =
    "UPDATE categoryProperties SET propertyName=? WHERE categoryID=? AND propertyName=?;";
  const params = [newPropertyName, categoryID, oldPropertyName];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error("Error while updating property name: ", err.message);
      result(err, null);
      return;
    }
    if (this.changes == 0) {
      console.error(
        "Trying to update a propertName for a categoryID that doesn't exist"
      );
      result({ kind: "not_found", message: "categoryID not found" }, null);
      return;
    }
    result(null, newPropertyName);
  });
};

// deletes a propertyName for a given categoryID
CategoryProperty.deletePropertyName = (categoryID, propertyName, result) => {
  const query =
    "DELETE FROM categoryProperties WHERE categoryID=? AND propertyName=?;";
  const params = [categoryID, propertyName];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error("Error while deleting property name: ", err.message);
      result(err, null);
      return;
    }
    if (this.changes == 0) {
      console.error(
        "Trying to delete a propertName for a categoryID that doesn't exist"
      );
      result({ kind: "not_found", message: "categoryID not found" }, null);
      return;
    }
    console.log(
      `Deleted propertyName ${propertyName} for categoryID ${categoryID}`
    );
    result(null, propertyName);
  });
};

module.exports = CategoryProperty;
