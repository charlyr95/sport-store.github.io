// Utilizado para simular el backend y base de datos

document.addEventListener("DOMContentLoaded", function () {
  // Ruta del archivo JSON
  const jsonUrl = "../js/products-database.json";

  // Contenedor de los productos
  const container = document.getElementById("products-container");

  // Función para cargar datos desde el JSON
  fetch(jsonUrl)
    .then(response => response.json())
    .then(products => {
      // Iterar sobre cada producto
      products.forEach((product, index) => {
        
        const card = `
        <div class="col product-item">
          <div class="card h-100" style="border-radius: 0 !important;">
            <div class="product-img border-bottom bg-white">
              <div class="card-image-container position-relative overflow-hidden">
                <img src="../assets/images/products/${product.main_image}" class="card-img-top main-image" alt="${product.title}">
                <img src="../assets/images/products/${product.hover_image}" class="card-img-top hover-image position-absolute top-0 start-0 w-100 h-100" alt="${product.title}">
              </div>
            </div>
            <div class="card-body bg-body-tertiary d-flex flex-column gap-1 pt-2 pb-3">
              <div class="product-vendor text-muted">${product.vendor}</div>
              <div class="product-title fw-bold">${product.title}</div>
              <ul class="list-unstyled mt-auto mb-0">
                <li><span class="text-dark-emphasis fw-bold">$${product.price.toLocaleString("es-AR")}</span></li>
                <li>${product.installments.quantity} cuotas de: <span class="text-dark-emphasis">$${product.installments.amount.toLocaleString("es-AR")}</span></li>
                <li><span class="text-dark-emphasis fw-bold">$${product.transfer_price.toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
              </ul>
            </div>
          </div>
        </div>
        `;
        
        container.innerHTML += card;
      });
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
});
