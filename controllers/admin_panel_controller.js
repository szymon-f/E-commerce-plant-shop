const productModel = require("../models/product.model");

function adminPanelControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.render('admin_panel')
    }else{
        res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość")
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
        res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelUsersControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.send("widok zarejestrowanych użytkowników")
    }else{
        res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelOrdersControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        res.send("widok aktywnych zamówień")
    }else{
        res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelEditProductControllerGet(req, res){
    if(req.session.loggedAsAdmin){
        console.log("widok edycji", req.query)
        res.render("admin_panel_edit_product", req.query)
    }else{
        res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość")
    }
}

function adminPanelProductsControllerPost(req, res){
    if(req.session.loggedAsAdmin){
        console.log("przesyłanie produktu", req.body)
        req.session.productToEdit = req.body
        res.redirect('/adminPanel/editProduct')
    }else{
        res.send("Musisz być zalgowany jako admin, aby wyświetlić tę zawartość")
    }
}


module.exports = {
    adminPanelControllerGet,
    adminPanelControllerPost,
    adminPanelProductsControllerGet,
    adminPanelProductsControllerPost,
    adminPanelUsersControllerGet,
    adminPanelOrdersControllerGet,
    adminPanelEditProductControllerGet
}