const customerOrderModel = require("../models/customerOrder.model");
const userModel = require("../models/user.model");
const orderProductModel = require("../models/orderProduct.model");

function getDate() {
  const currentDate = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(currentDate);

  return formattedDate;
}

function cartControllerGet(req, res) {
  if (req.session.user) {
    res.render("cart", { items: req.session.user.cart });
  } else {
    res.send("aby wyświetlić koszyk należy się zalogować");
  }
}

function cartControllerPost(req, res) {
  const cartItems = JSON.parse(req.body["cart-items"]);
  // console.log(`Użytkownik ${req.session.user.username} zamówił`, cartItems)
  userModel.getByUsername(req.session.user.username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      cartItems.forEach((element) => {
        console.log("1. linia foreach", data)
        customerOrderModel.create(
          { userID: data.userID, orderDate: getDate(), orderStatus: "pending" },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              orderProductModel.create(
                { orderID: data.id, productID: element.productId, quantity: 1 },
                (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(`Poprawnie złożono zamówienie ${data}`);
                  }
                }
              );
            }
          }
        );
      });
    }
  });
}

module.exports = {
  cartControllerGet,
  cartControllerPost,
};
