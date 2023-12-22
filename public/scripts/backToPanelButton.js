document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.querySelector('.go-back-button');

    logoutButton.addEventListener('click', function() {
      window.location.href = '/adminPanel';
    });
  });