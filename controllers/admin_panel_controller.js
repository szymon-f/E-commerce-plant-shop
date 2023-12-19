const productModel = require("../models/product.model");

function adminPanelControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.render('admin_panel')
    }else{
        res.send("Musisz być zalgowany jako admin, aby wyświetlić tę zawartość")
    }
    
}

function adminPanelControllerPost(req, res){}

function adminPanelProductsControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        productModel.getAll((err, data) => {
            if (err) {
              throw err;
            } else {
              res.render('admin_panel_products', { data: data });
            }
          });
    }else{
        res.send("Musisz być zalgowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelUsersControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.send("widok zarejestrowanych użytkowników")
    }else{
        res.send("Musisz być zalgowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelOrdersControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.send("widok aktywnych zamówień")
    }else{
        res.send("Musisz być zalgowany jako admin, aby wyświetlić tę zawartość")
    }
}


module.exports = {
    adminPanelControllerGet,
    adminPanelControllerPost,
    adminPanelProductsControllerGet,
    adminPanelUsersControllerGet,
    adminPanelOrdersControllerGet
}