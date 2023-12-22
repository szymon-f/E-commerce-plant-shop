document.querySelectorAll(".edit-product-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("product-id");
    const productName = button.getAttribute("product-name");
    const productDescription = button.getAttribute("product-description");
    const productPrice = button.getAttribute("product-price");
    const productImgPath = button.getAttribute("product-img-path");
    const productInOffer = button.getAttribute("product-in-offer");
    window.location.href = `/adminPanel/editProduct?productId=${productId}&productName=${productName}&productDescription=${productDescription}&productPrice=${productPrice}&productImgPath=${productImgPath}&productInOffer=${productInOffer}`;
  });
});
