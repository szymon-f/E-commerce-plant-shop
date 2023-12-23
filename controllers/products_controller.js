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
      res.render("products", { data: filtered , user: req.session.user});
    }
  });
}

function productsControllerGet(req, res) {
  productModel.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
      res.render("products", { data: data , user: req.session.user});
    }
  });
}


function productsControllerSaveToSession (req, res) {
  if(req.session.user.logged){
    req.session.user.cart.push(req.body)
  }
  res.json({ success: true });
}

function productsControllerLogout(req, res){
  req.session.user = undefined
  res.redirect('/products')
}

module.exports = {
  productsControllerPost,
  productsControllerGet,
  productsControllerSaveToSession,
  productsControllerLogout
};
