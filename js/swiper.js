// Función para inicializar el Swiper
(() => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      breakpoints: {
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 7,
          spaceBetween: 30,
        },
        1920: {
          slidesPerView: 8,
          spaceBetween: 30,
        },
        2560: {
          slidesPerView: 9,
          spaceBetween: 30,
        },
        3440: {
          slidesPerView: 10,
          spaceBetween: 30,
        },
      },
    });
  });
  
  // $grid-breakpoints: (
  //   xs: 0,
  //   sm: 576px,
  //   md: 768px,
  //   lg: 992px,
  //   xl: 1200px,
  //   xxl: 1400px
  // );