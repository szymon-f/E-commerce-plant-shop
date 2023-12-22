document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-product-button');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productId = this.getAttribute('product-id');
  
        fetch(`/adminPanel/deleteProduct/${productId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              console.log('Produkt usunięty');
            } else {
              console.error('Błąd podczas usuwania produktu');
            }
          })
          .catch(error => {
            console.error('Błąd:', error);
          });
      });
    });
  });