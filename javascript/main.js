const swiper = new Swiper("#banner-swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const activitiesSwiper = new Swiper("#activities-swiper", {
  slidesPerView: 3,
  loop: true,
  spaceBetween: 30,
  autoplay: false,
  navigation: {
    nextEl: ".activities-next",
    prevEl: ".activities-prev",
  },
});

const blogsSwiper = new Swiper("#blogs-swiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: false,
  pagination: {
    el: ".blog-panigation",
    clickable: true,
  },
});
