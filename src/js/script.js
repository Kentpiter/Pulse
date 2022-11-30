const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    autoHeight: true,
    navPosition: "bottom",    
  });

document.querySelector('.prev').addEventListener('click', () => slider.goTo('prev'));
document.querySelector('.next').addEventListener('click', () => slider.goTo('next'));

$(document).ready(function() {
         //Script for tabs
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
            $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.conteiner').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

        //Switch content on list      
        function toggleClass(item) {
            $(item).each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                })
            })        
        };

        toggleClass('.catalog-item__link');
        toggleClass('.catalog-item__back');
    
        // Modal
        $('[data-modal=consultation]').on('click',function() {
            $('.overlay, #consultation').fadeIn('slow');
        });
        $('.modal__close').on('click', function() {
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        });        
        $('.button_catalog').each(function(i) {
            $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('slow');
            })
        });

        //Valid
        function validForm(form) {
            $(form).validate({
                rules: {
                    name: 'required',
                    phone: 'required',
                    email: {
                        required: true,
                        email: true,
                    }
                },
                messages: {
                    name: "Пожалуйста, введите своё имя",
                    phone: "Пожалуйста, введите номер телефона",
                    email: {
                      required: "Нам нужен Ваш email,чтобы связаться с Вами",
                      email: "Не правильный адрес почты"
                    }
                }

            });
        };
        validForm('#form-consultation');
        validForm('#consultation form');
        validForm('#order form');

        //Maskedinput
        $("input[name=phone]").mask("+7(999) 999-99-99");

        //POST
        $('form').submit(function(e) {
            e.preventDefault();
            if (!$(this).valid()) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
    
                $('form').trigger('reset');
            });
            return false;
        });

        //pageUp
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        })

        //wow.js
        new WOW().init();
      
});    
