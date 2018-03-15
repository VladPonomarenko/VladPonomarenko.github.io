(function($) {
    "use strict";

    // Windows load

    $(window).on("load", function() {
    
    

     // Site loader 

        $(".loader-inner").fadeOut();
        $(".loader").delay(200).fadeOut("slow");

    });
    


    // Scroll to

    $('a.scroll').smoothScroll({
        speed: 800,
        offset: -77
    });
    


    // Slider

    $('.main-slider').flexslider({
        animation: "fade",
        slideshow: true,
        directionNav: true,
        controlNav: false,
        pauseOnAction: false,
        animationSpeed: 500
    });


    $('.slider').flexslider({
        animation: "slide",
        slideshow: true,
        directionNav: false,
        controlNav: true,
        pauseOnAction: false,
        animationSpeed: 1000
    });
    


    // Mobile menu

    var mobileBtn = $('.mobile-but');
    var nav = $('.main-nav ul');
    var navHeight = nav.height();

    $(mobileBtn).on("click", function() {
        $(".toggle-mobile-but").toggleClass("active");
        nav.slideToggle();
        $('.main-nav li a').addClass('mobile');
        return false;


    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && nav.is(':hidden')) {
            nav.removeAttr('style');
            $('.main-nav li a').removeClass('mobile');
        }

    });

    $('.main-nav li a').on("click", function() {
        if ($(this).hasClass('mobile')) {
            nav.slideToggle();
            $(".toggle-mobile-but").toggleClass("active");
        }

    });



    // Append images as css background

    $('.background-img').each(function() {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });
    


    // Images zoom 

    $('.venobox').venobox({
        titleattr: 'data-title',
        numeratio: true
    });
    


	// Instagram feed setup
    
    var instaFeed = new Instafeed({
        get: 'user',
        userId: '7198672980',
        accessToken: '7198672980.1677ed0.97b0ace2535c466eb23bc048f0f1bc59',
        limit: 5,
        resolution: 'standard_resolution',
        template: '<li><a href="{{link}}"><img src="{{image}}"/></a></li>'
    });
    instaFeed.run();


    // form sender

    $('#hero-form').on('submit', (e) =>{
        
        e.preventDefault();
        let form = $(e.target),
            data = form.serialize(),
            url = form.attr('action'),
            type = form.attr('method');
        /* console.log('form ', form); */
        
        ajaxForm(form).done( (msg) => {
            let mes = msg.mes,
                status = msg.status;
                console.log(status);
                
            if (status === 'OK') {
                console.log('OK'); // test
            }else{
                console.log('server error ', status); // test
            }
          }).fail( (jqXHR, textStatus) => {
                console.log('client error', textStatus);
               /*  console.log(jqXHR); */ // test
          });
      
      
        function ajaxForm(form){
            let data = form.serialize(),
                url = form.attr('action'),
                method = form.attr('method');
                console.log(data);
                
            return $.ajax({
                type: method,
                url: url,
                dataType: 'text',
                data: data
            });
        }
    });

})(jQuery);