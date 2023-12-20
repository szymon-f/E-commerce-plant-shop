const db = require("./db");

const CustomerOrder = function (userID, orderDate, orderStatus) {
  this.userID = userID;
  this.orderDate = orderDate;
  this.orderStatus = orderStatus;
};

CustomerOrder.create = (newCustomerOrder, result) => {
  const query =
    "INSERT INTO  customerOrders (userID, orderDate, orderStatus) VALUES (?,?,?);";
  const params = [
    newCustomerOrder.userID,
    newCustomerOrder.orderDate,
    newCustomerOrder.orderStatus,
  ];
  db.run(query, params, function (err, res) {
    if (err) {
      console.error(
        "Failed to insert new customerOrder into the database: ",
        err.message
      );
      result(err, null);
      return;
    }
    console.log("Inserted new customerOrder into the database: ", {
      id: this.lastID,
      ...newCustomerOrder,
    });
    result(null, { id: this.lastID, ...newCustomerOrder });
  });
};

CustomerOrder.getAll = (result) => {
  const query = "SELECT * FROM customerOrders;";
  const params = [];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error("Failed to retrieve all orders: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

CustomerOrder.getAllOrdersByUserID = (userID, result) => {
  const query = "SELECT * FROM customerOrders WHERE userID=?;";
  const params = [userID];
  db.all(query, params, function (err, rows) {
    if (err) {
      console.error("Failed to retrieve user orders by userID: ", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

module.exports = CustomerOrder;
