document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("product-id");
    const dataToSave = {
      productId: productId,
    };
    console.log("cos xxx");
    fetch("/products/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataToSave }),
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
