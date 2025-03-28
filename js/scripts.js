import {actualizarBreadcrumb,cargarProductos,cargarDetalleProducto} from "./pageRenderer.js";
import {showCart} from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  // console.log("Cargando scripts...")

  // Lógica para cada página
  if (path.includes("producto.html")) {
    cargarDetalleProducto();
    // addButtonEvent();
  } else if (path.includes("tienda.html")) {
    actualizarBreadcrumb();
    cargarProductos();
  } else if (path.includes("index.html")) {
    // cargarTopProductos();
    // initSwiper();
  }

  try {
    AOS.init();
  } catch (error) {
    console.error("Error al cargar AOS:", error);
  }
});

document.getElementById("shoppingCartBtn").onclick = function () {
  showCart();
};
