function adminAuthenticated() {
    return true
}

function loginAdminControllerGet(req, res) {
    res.render('login_admin')
}

function loginAdminControllerPost(req, res) {
    if(adminAuthenticated()){
        req.session.loggedAsAdmin = true
        res.redirect('adminPanel')
    }else{
        res.redirect('loginAdmin')
    }
}

module.exports = {
    loginAdminControllerGet,
    loginAdminControllerPost
}