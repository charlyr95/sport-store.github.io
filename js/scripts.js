import {actualizarBreadcrumb,cargarProductos,cargarDetalleProducto, cargarCarrito} from "./pageRenderer.js";
import {showCart,updateCartBadge} from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  actualizarPagina();
});

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    actualizarPagina();
  }
});

function actualizarPagina() {
  const path = window.location.pathname;

  if (path.includes("/index")) {
    // cargarTopProductos();
    // initSwiper();
  } else if (path.includes("/pages/producto")) {
    cargarDetalleProducto();
  } else if (path.includes("/pages/tienda")) {
    actualizarBreadcrumb();
    cargarProductos();
  } else if (path.includes("/pages/carrito")) {
    cargarCarrito();
  }

  try {
    AOS.init();
  } catch (error) {
    console.error("Error al cargar AOS:", error);
  }

  // Actualiza el badge del carrito en cada carga, incluso si es desde la caché
  updateCartBadge();
}

