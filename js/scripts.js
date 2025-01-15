document.addEventListener("DOMContentLoaded", function () {
const urlParams = new URLSearchParams(window.location.search);
const gender = urlParams.get('gender');
const age = urlParams.get('age');
const show = urlParams.get('show');
const breadcrumbCategory = document.getElementById('breadcrumb-category');

if (gender === 'female') {
    breadcrumbCategory.textContent = 'Mujer';
} else if (gender === 'male') {
    breadcrumbCategory.textContent = 'Hombre';
} else if (age === 'kid') {
    breadcrumbCategory.textContent = 'Niños';
} else if (show === 'deport') {
    breadcrumbCategory.textContent = 'Disciplinas';
} else if (show === 'brand') {
    breadcrumbCategory.textContent = 'Marcas';
} else {
    breadcrumbCategory.remove();  // Elimina el último ítem si no hay categoría
}
});
