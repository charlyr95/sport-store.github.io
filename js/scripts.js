import {actualizarBreadcrumb, cargarProductos,cargarDetalleProducto, cargarCarrito} from "./pageRenderer.js";
import {showCart,updateCartBadge} from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  // console.log("Cargando scripts...")

  // Lógica para cada página
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

  // Actualiza el badge del carrito al cargar página.
  updateCartBadge();
});


