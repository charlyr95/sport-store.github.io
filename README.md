<h1>sport-store.github.io</h1>
Ejemplo página de e-commerce creada con HTML5, CSS3 y JavaScript vanilla
Esta es una página de fantasía creada sin fines de lucro.

La página está desplegada en GitHub Pages:
https://charlyr95.github.io/sport-store.github.io/

<b>Curso Javascript</b>

Entrega 1:
  - La entrega contempla código hecho en el curso de Desarrollo Web, por lo tanto existe código en javascript que pertenece a esa etapa
  - Debido a cómo está armada la página, en esta instancia, he tenido que utilizar local storage para almacenar los datos del carrito. Ya que al no ser SPA si cambio de sección hace que se refresque la página y las variables globales (como podría ser un array con el carrito) pierden su valor.
  - En esta instancia he creado el archivo cart.js que contiene la lógica relacionada al carrito de compras.
  - Además está el script pageRenderer.js que genera en el DOM los elementos almacenado en el carrito de compras.

Entrega 2:
  - Se corrige el código en javascript.
  - Correcciones menores referidas al momento de ejecución de los scripts.
  - Lo anterior contempla las consignas de esta entrega.

Entrega Final:
  - Se eliminan los alerts y console log
  - Se utiliza la libería SweetAlert2 para dar feedback a las acciones del usuario referidas al carrito de compras.