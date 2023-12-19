// document.addEventListener('DOMContentLoaded', function() {
//     var editProductsButton = document.querySelector('.edit-products-button');
//     editProductsButton.addEventListener("click", () => {
//         fetch("/adminPanel/products", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.success) {
//               console.log(`Przejście do widoku edycji produktów`);
//             } else {
//               console.error("Wystąpił błąd podczas zapisywania danych do sesji.");
//             }
//           })
//           .catch((error) => {
//             console.error("Wystąpił błąd:", error);
//           });
//       });
// });

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