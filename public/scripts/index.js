window.onload = ()  => {
    console.log(bulmaCarousel);

    bulmaCarousel.attach('#carousel-upcoming', {
      slidesToScroll: 1,
      slidesToShow: 3,
      pagination: false,
      infinite: true
    });
};