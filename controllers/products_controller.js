const productModel = require("../models/product.model");


// szukajka
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
      res.render("products", { data: data , logged: req.session.logged});
    }
  });
}


function productsControllerSaveToSession (req, res) {
  req.session.cart.push(req.body)
  res.json({ success: true });
}

function productsControllerLogout(req, res){
  req.session.logged = false
  res.redirect('/products')
}

module.exports = {
  productsControllerPost,
  productsControllerGet,
  productsControllerSaveToSession,
  productsControllerLogout
};
