function cartControllerGet(req, res) {
    res.render('cart', {items: req.session.user.cart})
}

module.exports ={ cartControllerGet}