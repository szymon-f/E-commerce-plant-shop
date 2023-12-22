document.querySelectorAll(".new-product-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = `/adminPanel/editProduct?newProduct=${true}`
  });
});