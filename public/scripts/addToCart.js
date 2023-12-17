document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("product-id");
    const productName = button.getAttribute("product-name");
    const productDescription = button.getAttribute("product-description");
    const productPrice = button.getAttribute("product-price")
    const dataToSave = {
      productId: productId,
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice
    };
    fetch("/products/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(`Dane produktu ${productId} zostały zapisane do sesji.`);
        } else {
          console.error("Wystąpił błąd podczas zapisywania danych do sesji.");
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd:", error);
      });
  });
});
