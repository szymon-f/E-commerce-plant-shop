function userAuthenticated(){
    return true
}

function loginControllerGet(req, res) {
    res.render('login', {messages: req.flash()});
}

function loginControllerPost(req, res) {
    if(userAuthenticated()){
        req.session.logged = true
        res.redirect('products')
    }else{
        req.flash('badLogin', 'Wprowadzone dane są niepoprawne, sprawdź login oraz hasło')
        res.redirect('login')
    }
}


module.exports = {loginControllerGet, loginControllerPost}