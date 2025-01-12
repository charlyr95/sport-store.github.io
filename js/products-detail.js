document.addEventListener("DOMContentLoaded", function () {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Ruta del archivo JSON
  const jsonUrl = "../js/products-database.json";

  // Contenedor del detalle del producto
  const container = document.getElementById("product-detail");

  // Validar si el ID existe en la URL
  if (productId) {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(products => {
        // Buscar el producto por ID
        const product = products.find(item => item.product_id === productId);

        if (product) {
          // Crear el detalle del producto
          const productDetail = `
          <div class="container my-5">
            <div class="row">
              <!-- Imagen del producto -->
              <div class="col-md-6">
                <div class="card-image-container position-relative overflow-hidden">
                  <img src="../assets/images/products/${product.main_image}" class="card-img-top main-image" alt="${product.title}">
                  <img src="../assets/images/products/${product.hover_image}" class="card-img-top hover-image position-absolute top-0 start-0 w-100 h-100" alt="${product.title}">
                </div>
              </div>

              <!-- Información del producto -->
              <div class="col-md-6 mt-5 mt-md-0">
                <h5>${product.vendor}</h5>
                <h3>${product.title}</h3>
                <div class="text-muted">
                  <ul class="list-unstyled mt-auto mb-0">
                      <li><span class="text-dark-emphasis fw-bold">$${product.price.toLocaleString("es-AR")}</span></li>
                      <li>${product.installments_quantity} cuotas de: <span class="text-dark-emphasis">$${(Math.round(product.price / product.installments_quantity)).toLocaleString("es-AR")}</span></li>
                      <li><span class="text-dark-emphasis fw-bold">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
                    </ul>
                </div>
                <p>${product.description || ""}</p>

                <!-- Opciones de talla -->
                <div class="mb-3">
                  <label for="talla" class="form-label">Talla</label>
                  <select id="talla" class="form-select">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                  </select>
                </div>

                <!-- Cantidad -->
                <div class="mb-5">
                  <label for="cantidad" class="form-label">Cantidad</label>
                  <input type="number" id="cantidad" class="form-control" value="1" min="1">
                </div>

                <!-- Botón de compra -->
                <button class="btn btn-warning w-100">Agregar al carrito</button>
              </div>
            </div>
            </div>
          `;

          // Insertar el detalle en el contenedor
          container.innerHTML = productDetail;
        } else {
          // Si el producto no se encuentra
          container.innerHTML = `<p class="text-danger">Producto no encontrado.</p>`;
        }
      })
      .catch(error => console.error("Error al cargar el JSON:", error));
  } else {
    // Si no se proporciona un ID
    container.innerHTML = `<p class="text-warning">No se especificó un producto.</p>`;
  }
});
