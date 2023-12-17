const productModel = require("../models/product.model");


function cartControllerGet(req, res) {
    console.log('koszyk', req.session.cart)
    req.session.itemsInCart = []
    req.session.cart.forEach(element => {
        productModel.getByID(element, (err, data)=>{
            if(err){
                throw err;
            }else{
                req.session.itemsInCart.push(data)
                console.log(req.session.itemsInCart)
            }
        })
    });
    console.log('15 linia', req.session.itemsInCart)
    res.send(`coś ${req.session.itemsInCart}`)
}

module.exports ={ cartControllerGet}