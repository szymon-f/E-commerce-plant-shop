const db = require("./db");

const OrderProduct = function (orderID, productID, quantity) {
  this.orderID = orderID;
  this.productID = productID;
  this.quantity = quantity;
};

OrderProduct.create = (newOrderProduct, result) => {
  const query =
    "INSERT INTO  orderProducts (orderID, productID , quantity) VALUES (?,?,?);";
  const params = [
    newOrderProduct.orderID,
    newOrderProduct.productID,
    newOrderProduct.quantity,
  ];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Failed to insert new orderProduct into the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Inserted new orderProduct into the database: ", {
      id: this.lastID,
      ...newOrderProduct,
    });
    result(null, { id: this.lastID, ...newOrderProduct });
  });
};

OrderProduct.getByOrderID = (orderID, result) => {
  const query = "SELECT * FROM orderProducts WHERE orderID=?;";
  const params = [orderID];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error("Failed to retrieve all orders by ID: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

module.exports = OrderProduct;
