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
  updateCartBadge();
}

export function clearCart() {
  localStorage.removeItem(cartKey);
  updateCartBadge();
}

// Agregar producto al carrito
export function addToCart(product) {
  const cart = loadCart();

  // Verificar si el producto ya está en el carrito
  const existingProduct = cart.find(
    (item) => item.product_id === product.product_id
  );

  cart.push(product);
  saveCart(cart);
  Swal.fire({
    icon: 'success',
    title: `${product.title}`,
    text: `Agregado al carrito`,
    timer: 1500,
    timerProgressBar: true
  });
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
export function removeFromCart(index) {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
}

// Obtener productos en el carrito
export function getCartItems() {
  return loadCart();
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
  const removeButtons = document.getElementsByClassName("remove-item__button");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      Swal.fire({
        title: '¿Quieres vaciar el carrito?',
        text: "Eliminarás todos los productos del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart();
          cargarCarrito();
        }
      });
    });
  } else {
    console.error("El botón de agregar al carrito no se encontró en el DOM.");
  }

  if (removeButtons) {
    Array.from(removeButtons).forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.dataset.id;
        Swal.fire({
          title: '¿Quieres quitar este producto?',
          text: "Puedes guardarlo para después si lo prefieres",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            removeFromCart(itemId);
            cargarCarrito();
          }
        });
      });
    });
  }
}

// Función para actualizar el badge del carrito
export function updateCartBadge() {
  const cartBadge = document.getElementById("cart-badge");
  const totalItems = getTotalProducts();

  if (cartBadge) {
    if (totalItems > 0) {
      if (totalItems < 10) cartBadge.textContent = totalItems;
      else cartBadge.textContent = "9+";
      cartBadge.style.display = "block";
    } else {
      cartBadge.style.display = "none";
    }
  }
}
