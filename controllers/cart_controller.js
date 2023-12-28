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
    res.render("cart", { items: req.session.user.cart, messages: req.flash() });
  } else {
    res.send("aby wyświetlić koszyk należy się zalogować");
  }
}

function cartControllerPost(req, res) {
  const cartItems = JSON.parse(req.body["cart-items"]);
  userModel.getByUsername(req.session.user.username, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      customerOrderModel.create(
        { userID: data.userID, orderDate: getDate(), orderStatus: "pending" },
        (err, data) => {
          if (err) {
            console.error(err);
          } else {
            cartItems.forEach(item => {
              orderProductModel.create(
                { orderID: data.id, productID: item.productId, quantity: 1 },
                (err, data) => {
                  if (err) {
                    console.error(err);
                  } else {
                    // console.log('')
                  }
                }
              );
            });
            req.session.user.cart = []  // usuwam produkty z koszyka
            req.flash("paid", "Pomyślnie złożono zamówienie");
            res.redirect('/cart');
            // console.log('Złożono zamówienie:', data);
          }
        }
      );
    }
  });
}

module.exports = {
  cartControllerGet,
  cartControllerPost,
};
