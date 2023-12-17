function cartControllerGet(req, res) {
    console.log(req.session.cart)
    res.render('cart', {items: req.session.cart})
}

module.exports ={ cartControllerGet}