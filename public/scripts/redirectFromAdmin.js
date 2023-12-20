document.addEventListener('DOMContentLoaded', function() {
  var editProductsButton = document.querySelector('.edit-products-button');
    editProductsButton.addEventListener('click', function() {
      window.location.href = '/adminPanel/products';
    });

    var ordersButton = document.querySelector('.orders-button');
    ordersButton.addEventListener('click', function() {
      window.location.href = '/adminPanel/orders';
    });

    var userTableButton = document.querySelector('.users-table-button');
    userTableButton.addEventListener('click', function() {
      window.location.href = '/adminPanel/users';
    });   
});