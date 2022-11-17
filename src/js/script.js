const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    autoHeight: true,
    navPosition: "bottom",
    responsive: {
        320: {
          nav: true,                    
        },
        768: {
            nav: false,            
          }, 
    }  
  });

document.querySelector('.prev').addEventListener('click', () => slider.goTo('prev'));
document.querySelector('.next').addEventListener('click', () => slider.goTo('next'));