import {actualizarBreadcrumb,cargarProductos,cargarDetalleProducto, cargarCarrito} from "./pageRenderer.js";
import {showCart} from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  // console.log("Cargando scripts...")

  // Lógica para cada página
  if (path.includes("/index.html")) {
    // cargarTopProductos();
    // initSwiper();
  } else if (path.includes("/pages/producto.html")) {
    cargarDetalleProducto();
  } else if (path.includes("/pages/tienda.html")) {
    actualizarBreadcrumb();
    cargarProductos();
  } else if (path.includes("/pages/carrito.html")) {
    cargarCarrito();
  } 

  try {
    AOS.init();
  } catch (error) {
    console.error("Error al cargar AOS:", error);
  }
});

