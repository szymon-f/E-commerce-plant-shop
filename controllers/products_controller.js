const productModel = require("../models/product.model");

function productsControllerPost(req, res){}

function productsControllerGet(req, res) {
    productModel.getAll((err, data) => {
        if (err) {
          throw err;
        } else {
          res.render('products', {data: data})
        }
      });
}

module.exports = {
    productsControllerPost,
    productsControllerGet
};