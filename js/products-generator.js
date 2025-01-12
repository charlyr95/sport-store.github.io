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
            <div class="col product-item z-1">
              <div class="product-card-container h-100">
               <div class="h-100 position-relative p-0">
                <div class="card h-100 border-sm-bottom-0" style="border-radius: 0 !important;">
                  <div class="product-img border-bottom bg-white">
                    <div class="card-image-container position-relative overflow-hidden">
                      <img src="../assets/images/products/${product.main_image}" class="card-img-top main-image" alt="${product.title}">
                      <img src="../assets/images/products/${product.hover_image}" class="card-img-top hover-image position-absolute top-0 start-0 w-100 h-100" alt="${product.title}">
                    </div>
                  </div>
                  <div class="card-body bg-body-tertiary d-flex flex-column gap-1 py-2">
                    <div class="product-vendor text-muted">${product.vendor}</div>
                    <div class="product-title fw-bold">${product.title}</div>
                    <ul class="list-unstyled mt-auto mb-0">
                      <li><span class="text-dark-emphasis fw-bold">$${product.price.toLocaleString("es-AR")}</span></li>
                      <li>${product.installments_quantity} cuotas de: <span class="text-dark-emphasis">$${(Math.round(product.price / product.installments_quantity)).toLocaleString("es-AR")}</span></li>
                      <li><span class="text-dark-emphasis fw-bold">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
                    </ul>
                  </div>
                  </div>
                  <div class="m-0 p-0">
                    <div class="buy-button bg-body-tertiary top-0">
                      <div class="p-4 pt-1">
                        <a href="./producto.html?id=${product.product_id}" class="btn btn-warning w-100 z-5" role="button">
                          Ver producto
                        </a>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>

        `;
        
        container.innerHTML += card;
      });
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
});
