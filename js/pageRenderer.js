import {addEventCarrito, addEventProduct, getCartItems, getTotalProducts, getTotalPrice} from "./cart.js";

// Utilizado para simular el backend y base de datos
export function cargarTopProductos() {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productGender = urlParams.get("gender"); // Ruta del archivo JSON

  const jsonUrl = "../js/products-database.json";

  // Contenedor de los productos
  const container = document.getElementById("swiper-wrapper");

  fetch(jsonUrl)
    .then((response) => response.json())
    .then((products) => {
      // Ordenar los productos por ventas en orden descendente y tomar los 10 primeros
      const topProducts = products
        .sort((a, b) => b.sell_count - a.sell_count)
        .slice(0, 10);

      // Crear el slider con los productos más vendidos
      const sliderContent = topProducts
        .map(
          (product) => `
          <div class="swiper-slide">
            <div class="product-item z-1 pb-5">
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
                        <li>${product.installments_quantity} cuotas de: <span class="text-dark-emphasis">$${Math.round(product.price / product.installments_quantity).toLocaleString("es-AR")}</span></li>
                        <li><span class="text-dark-emphasis fw-bold">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
                      </ul>
                    </div>
                  </div>
                  <div class="m-0 p-0 z-2">
                    <div class="buy-button bg-body-tertiary top-0 z-2">
                      <div class="p-4 pt-1 z-2">
                        <a href="./pages/producto.html?id=${product.product_id}" class="btn btn-warning w-100 z-5" role="button"> Ver producto </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
        )
        .join("");

      // Insertar el contenido en el contenedor
      container.innerHTML = `${sliderContent}`;
      initSwiper();
      // Aquí puedes inicializar un carrusel si usas una librería como Swiper o Slick
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));
}

// Utilizado para simular el backend y base de datos
export function cargarProductos() {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productGender = urlParams.get("gender"); // Ruta del archivo JSON

  const jsonUrl = "../js/products-database.json";

  // Contenedor de los productos
  const container = document.getElementById("products-container");

  // Función para cargar datos desde el JSON
  fetch(jsonUrl)
    .then((response) => response.json())
    .then((products) => {
      // Iterar sobre cada producto
      products.forEach((product, index) => {
        if (
          !productGender ||
          product.gender === productGender ||
          product.gender === "unisex"
        ) {
          const card = `
                <div class="col product-item z-1" data-aos="flip-right">
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
                          <li>${product.installments_quantity} cuotas de: <span class="text-dark-emphasis">$${Math.round(product.price / product.installments_quantity).toLocaleString("es-AR")}</span></li>
                          <li><span class="text-dark-emphasis fw-bold">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
                        </ul>
                      </div>
                      </div>
                      <div class="m-0 p-0 z-2">
                        <div class="buy-button bg-body-tertiary top-0 z-2">
                          <div class="p-4 pt-1 z-2">
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
        }
      });
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));
}
// Utilizado para simular el backend y base de datos
export function cargarCarrito() {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productGender = urlParams.get("gender"); // Ruta del archivo JSON

  const jsonUrl = "../js/products-database.json";

  // Contenedores
  const cartContainer = document.getElementById("product-detail");
  const cartCounter1 = document.getElementById("productCounterStart");
  const cartCounter2 = document.getElementById("productCounterEnd");

  // Función para cargar datos desde el JSON
  const carrito = getCartItems();
  console.log(carrito);
  cartContainer.innerHTML = ""; // Limpia el contenedor antes de agregar productos

  carrito.forEach((product, index) => {
    const card = `
                  <div class="list-group-item cart-item bg-transparent py-3">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <img src="../assets/images/products/${product.main_image}" alt="${product.title}" class="cart-item-img rounded border">
                      </div>
                      <div class="col">
                        <div class="d-flex flex-column">
                          <span class="text-muted small">${product.vendor}</span>
                          <h6 class="mb-1">${product.title}</h6>
                          <!-- <span class="text-muted small">Talle: 42</span>
                          <span class="text-muted small">Color: Negro/Blanco</span>-->
                        </div>
                      </div>
                      <div class="col-auto col-md-2">
                        <!--<div class="input-group input-group-sm quantity-selector">
                          <button class="btn btn-outline-secondary" type="button">-</button>
                          <input type="number" class="form-control text-center" value="1" min="1" max="10">
                          <button class="btn btn-outline-secondary" type="button">+</button>
                        </div>-->
                      </div>
                      <div class="col-auto col-md-2 text-end">
                        <div class="d-flex flex-column">
                          <span class="fw-bold">$${product.price.toLocaleString("es-AR")}</span>
                          <small class="text-warning">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")} con Transferencia</small>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="bi bi-x-lg remove-item" title="Eliminar producto"></i>
                      </div>
                    </div>
                  </div>
              `;

          cartContainer.innerHTML += card;
          addEventCarrito();
          const TotalProducts = getTotalProducts();
          cartCounter1.textContent = `Productos (${TotalProducts})`;
          cartCounter2.textContent = `${TotalProducts} productos`;

        }
  );
}

export function cargarDetalleProducto() {
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
      .then((response) => response.json())
      .then((products) => {
        // Buscar el producto por ID
        const product = products.find((item) => item.product_id === productId);

        if (product) {
          // Crear el detalle del producto
          const productDetail = `
              <div class="container">
                <div class="row">
                  <!-- Imagen del producto -->
                  <div class="col-md-6">
                    <div class="card card-image-container position-relative overflow-hidden">
                      <img src="../assets/images/products/${product.main_image}" class="card-img-top main-image" alt="${product.title}">
                      <img src="../assets/images/products/${product.hover_image}" class="card-img-top hover-image position-absolute top-0 start-0 w-100 h-100" alt="${product.title}">
                    </div>
                  </div>
    
                  <!-- Información del producto -->
                  <div class="col-md-6 mt-5 mt-md-0 d-flex flex-column gap-2">
                    <h5>${product.vendor}</h5>
                    <h3>${product.title}</h3>
                    <div class="text-muted">
                      <ul class="list-unstyled">
                          <li><span class="text-dark-emphasis fw-bold">$${product.price.toLocaleString("es-AR")}</span></li>
                          <li>${product.installments_quantity} cuotas de: <span class="text-dark-emphasis">$${Math.round(product.price / product.installments_quantity).toLocaleString("es-AR")}</span></li>
                          <li><span class="text-dark-emphasis fw-bold">$${(Math.round(product.price * 0.0085) * 100).toLocaleString("es-AR")}</span> <small class="text-muted">con Transferencia</small></li>
                        </ul>
                    </div>
                    <p class="d-none">${product.description || ""}</p>
    
                    <!-- Opciones de talla -->
                    <div class="">
                      <label for="talla" class="form-label">Talla</label>
                      <select id="talla" class="form-select">
                        ${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("")}
                      </select>
                    </div>
    
                    <!-- Cantidad -->
                    <div class="">
                      <label for="cantidad" class="form-label">Cantidad</label>
                      <input type="number" id="cantidad" class="form-control" value="1" min="1">
                    </div>
    
                    <!-- Botón de compra -->
                    <button id="addToCartButton" data-id="${product.product_id}" class="btn btn-warning w-100">Agregar al carrito</button>
                    
                    <div class="card" style="font-size: 0.8em;">
                      <ul class="list-unstyled p-3">
                        <li>Precio Exclusivo Online</li>
                        <li>El precio puede variar en nuestras tiendas físicas:</li>
                        <li>-Tendrás atención personalizada por profesionales especializado</li>
                        <li>-Ganas la oportunidad de ver, tocar y probar en físico multitud de productos</li>
                      </ul>
                    </div>
    
                  </div>
                </div>
              </div>
              `;

          // Insertar el detalle en el contenedor
          container.innerHTML = productDetail;
          addEventProduct();
        } else {
          // Si el producto no se encuentra
          container.innerHTML = `<p class="text-danger">Producto no encontrado.</p>`;
        }
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  } else {
    // Si no se proporciona un ID
    container.innerHTML = `<p class="text-warning">No se especificó un producto.</p>`;
  }
}

export function actualizarBreadcrumb() {
  const urlParams = new URLSearchParams(window.location.search);
  const gender = urlParams.get("gender");
  const age = urlParams.get("age");
  const show = urlParams.get("show");
  const breadcrumbCategory = document.getElementById("breadcrumb-category");

  if (gender === "female") {
    breadcrumbCategory.textContent = "Mujer";
  } else if (gender === "male") {
    breadcrumbCategory.textContent = "Hombre";
  } else if (age === "kid") {
    breadcrumbCategory.textContent = "Niños";
  } else if (show === "deport") {
    breadcrumbCategory.textContent = "Disciplinas";
  } else if (show === "brand") {
    breadcrumbCategory.textContent = "Marcas";
  } else {
    breadcrumbCategory.remove(); // Elimina el último ítem si no hay categoría
  }
}
