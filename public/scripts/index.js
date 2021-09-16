window.onload = ()  => {
    bulmaCarousel.attach('#carousel-upcoming', {
      slidesToScroll: 1,
      slidesToShow: 5,
      pagination: false,
      infinite: true
    });

    bulmaCarousel.attach('#carousel-topRated', {
      slidesToScroll: 1,
      slidesToShow: 5,
      pagination: false,
      infinite: true
    });

    bulmaCarousel.attach('#carousel-watchlist', {
      slidesToScroll: 1,
      slidesToShow: 4,
      pagination: false,
      
    });

    bulmaCarousel.attach('#carousel-recomendation', {
      slidesToScroll: 1,
      slidesToShow: 8,
      pagination: false,
      infinite: true
    });



};