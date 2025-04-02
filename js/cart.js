// debuggear console.log(localStorage.getItem("shopppingCart"))
import { cargarCarrito } from "./pageRenderer.js";

// Carrito de compras (se guarda en localStorage)
const cartKey = "shoppingCart";
const productList = [];

// Cargar el carrito desde localStorage
export function loadCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// Guardar el carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(cartKey);
  location.reload();
}

// Agregar producto al carrito
export function addToCart(product) {
  const cart = loadCart();

  // Verificar si el producto ya está en el carrito
  const existingProduct = cart.find(
    (item) => item.product_id === product.product_id
  );

  cart.push(product);
  // if (existingProduct) {
  //     existingProduct.quantity += 1; // Incrementar cantidad
  // } else {
  //     product.quantity = 1; // Primera vez que se agrega
  // }

  saveCart(cart);
  alert(`🛒 ${product.title} agregado al carrito.`);
}

// Obtiene la cantidad total de productos en el carrito
export function getTotalProducts() {
  const cart = loadCart();
  return cart.length;
}

// Obtiene el precio total de los productos en el carrito
export function getTotalPrice() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.price, 0);
}

// Eliminar producto del carrito
export function removeFromCart(productId) {
  const cart = loadCart();
  cart = cart.filter((item) => item.product_id !== productId);
  saveCart(cart);
}

// Obtener productos en el carrito
export function getCartItems() {
  return loadCart();
}

// Mostrar productos en consola (para debug)
export function showCart() {
  const cart = getCartItems();
  const sCart = cart.join("\r\n");
  alert(`🛒 Carrito:\r\n${sCart}`);
  console.log(cart);
}

// Simular obtención de producto desde un JSON local o base de datos
const getProductById = (productId) => {
  const jsonUrl = "../js/products-database.json";

  return fetch(jsonUrl)
    .then((response) => response.json())
    .then((products) => products.find((p) => p.product_id === productId))
    .catch((error) => {
      console.error("Error al obtener el producto:", error);
      return null;
    });
};

// Evento para botón "Agregar al carrito"
export function addEventProduct() {
  const addToCartBtn = document.getElementById("addToCartButton");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Obtener el ID del producto desde el atributo data-id
      const productId = addToCartBtn.getAttribute("data-id");

      // Llamar a la función para agregar al carrito
      getProductById(productId)
        .then((product) => addToCart(product))
        .catch((error) => {
          console.error("Error al obtener el producto:", error);
        });
    });
  } else {
    console.error("El botón de agregar al carrito no se encontró en el DOM.");
  }
}
// Evento para botón "Agregar al carrito"
export function addEventCarrito() {
  const clearCartBtn = document.getElementById("clearCartBtn");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      clearCart();
      // alert("🛒 El carrito ha sido vaciado.");
    });
  } else {
    console.error("El botón de agregar al carrito no se encontró en el DOM.");
  }
}
