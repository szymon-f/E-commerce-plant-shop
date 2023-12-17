const productModel = require("../models/product.model");

function productsControllerPost(req, res) {
  productModel.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
      const filtered = [];
      for (let item in data) {
        if (data[item].name.toLowerCase().includes(req.body["query"].toLowerCase())) {
          filtered.push(data[item]);
        }
      }
      res.render("products", { data: filtered });
    }
  });
}

function productsControllerGet(req, res) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  productModel.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
      res.render("products", { data: data });
    }
  });
}


function productsControllerSaveToSession (req, res) {
  req.session.cart.push(req.body.productId)
  console.log(req.session.cart)
  res.json({ success: true });
}

module.exports = {
  productsControllerPost,
  productsControllerGet,
  productsControllerSaveToSession
};
