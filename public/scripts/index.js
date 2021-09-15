window.onload = ()  => {
    console.log(bulmaCarousel);

    bulmaCarousel.attach('#carousel-upcoming', {
      slidesToScroll: 1,
      slidesToShow: 3,
      pagination: false,
      infinite: true
    });

    bulmaCarousel.attach('#carousel-topRated', {
      slidesToScroll: 1,
      slidesToShow: 3,
      pagination: false,
      infinite: true
    });

    bulmaCarousel.attach('#carousel-watchlist', {
      slidesToScroll: 1,
      slidesToShow: 3,
      pagination: false,
      
    });



};