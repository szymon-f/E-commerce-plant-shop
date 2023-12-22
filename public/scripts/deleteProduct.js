document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-product-button');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productId = this.getAttribute('product-id');
          window.location.href = `/adminPanel/deleteProduct/${productId}`;
      });
    });
});