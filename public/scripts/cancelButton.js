document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.querySelector('.cancel-button');

    logoutButton.addEventListener('click', function() {
      window.location.href = '/adminPanel/products';
    });
  });