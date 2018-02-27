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
        userId: '6018730828',
        accessToken: '6018730828.13072c1.eaf3bbc0902148e2ac51bcd1e4575011',
        limit: 5,
        resolution: 'standard_resolution',
        template: '<li><a href="{{link}}"><img src="{{image}}"/></a></li>'
    });
    instaFeed.run();




})(jQuery);