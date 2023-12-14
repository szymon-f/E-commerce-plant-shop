const productModel = require("../models/product.model");

productModel.getAll((err, data) => {
  if (err) {
    throw err;
  } else {
    for( let item in data){
        console.log(data[item].name)
        console.log("################")
    }
  }
});
