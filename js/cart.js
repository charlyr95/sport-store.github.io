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

// Agregar producto al carrito
export function addToCart(product) {
    const cart = loadCart();
    
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.product_id === product.product_id);
    
    cart.push(product);
    // if (existingProduct) {
    //     existingProduct.quantity += 1; // Incrementar cantidad
    // } else {
    //     product.quantity = 1; // Primera vez que se agrega
    // }
    
    saveCart(cart);
    alert(`🛒 ${product} agregado al carrito.`);
}

// Eliminar producto del carrito
export function removeFromCart(productId) {
    const cart = loadCart();
    cart = cart.filter(item => item.product_id !== productId);
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
    alert(`🛒 Carrito:\r\n${sCart}`)
    console.log(cart);
}

// Simular obtención de producto desde un JSON local o base de datos
const getProductById = async (productId) => {
    // Aquí puedes hacer un `fetch` a tu backend o JSON
  const jsonUrl = "../js/products-database.json";

  fetch(jsonUrl)
    .then((response) => response.json())
    .then((products) => {
        return products.find(p => p.product_id === productId);
    });
};

// Evento para botón "Agregar al carrito"
export function addButtonEvent(){
    const addToCartBtn = document.getElementById("addToCartButton");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            // Obtener el ID del producto desde el atributo data-id
            const productId = addToCartBtn.getAttribute("data-id");

            // // Llamar a la función para agregar al carrito
            addToCart(productId);
        });
    } else {
        console.error("El botón de agregar al carrito no se encontró en el DOM.");
    }
};