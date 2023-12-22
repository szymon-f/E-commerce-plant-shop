const productModel = require("../models/product.model");

function adminPanelControllerGet(req, res) {
  if (req.session.loggedAsAdmin) {
    res.render("admin_panel");
  } else {
    res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość");
  }
}

function adminPanelControllerPost(req, res) {}

function adminPanelProductsControllerGet(req, res) {
  if (req.session.loggedAsAdmin) {
    productModel.getAll((err, data) => {
      if (err) {
        throw err;
      } else {
        res.render("admin_panel_products", { data: data });
      }
    });
  } else {
    res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość");
  }
}

function adminPanelUsersControllerGet(req, res) {
  if (req.session.loggedAsAdmin) {
    res.send("widok zarejestrowanych użytkowników");
  } else {
    res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość");
  }
}

function adminPanelOrdersControllerGet(req, res) {
  if (req.session.loggedAsAdmin) {
    res.send("widok aktywnych zamówień");
  } else {
    res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość");
  }
}

function adminPanelEditProductControllerGet(req, res) {
  if (req.session.loggedAsAdmin) {
    res.render("admin_panel_edit_product", req.query);
  } else {
    res.send("Musisz być zalogowany jako admin, aby wyświetlić tę zawartość");
  }
}

function adminPanelEditProductControllerPost(req, res) {
  if (req.session.loggedAsAdmin) {
    console.log("update formularz", req.body);
    if (req.body.ifNewProduct == "") {
      for (const [key, value] of Object.entries(req.body)) {
        if (key != "productId" && key != "ifNewProduct") {
          productModel.update(req.body.productId, key, value, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Poyślnie edytowano produkt");
            }
          });
        }
      }
    } else {
      delete req.body.ifNewProduct;
      delete req.body.productId;
      console.log("nowy produkt", req.body);
      productModel.create(req.body, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Poyślnie dodano produkt");
        }
      });
    }
    res.redirect("/adminPanel/products");
  } else {
    res.send("Musisz być zalogowany jako admin aby dodać produkt do bazy");
  }
}

function adminPanelProductsControllerDelete(req, res) {
  if (req.session.loggedAsAdmin) {
    const productIdToDelete = req.params.productId;
    console.log("usuwanie", productIdToDelete);
    productModel.deleteProduct(productIdToDelete, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Pomyślnie usunięto produkt o id ${data}`);
        res.redirect("/adminPanel/products");
      }
    });
  } else {
    res.send("Tylko administrator może usuwać produkty");
  }
}

module.exports = {
  adminPanelControllerGet,
  adminPanelControllerPost,
  adminPanelProductsControllerGet,
  adminPanelUsersControllerGet,
  adminPanelOrdersControllerGet,
  adminPanelEditProductControllerGet,
  adminPanelEditProductControllerPost,
  adminPanelProductsControllerDelete,
};
