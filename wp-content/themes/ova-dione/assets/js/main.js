/* global ScrollMagic, Linear */

(function($){
    "use strict";
    
    var $body = $('body');
        
    
    
    /*------------------------------------*\
        Shrink navigation.
    \*------------------------------------*/
    
    $(window).scroll(function(){
        if ($(document).scrollTop() > 80){
            $('.navbar').addClass('shrink');
        }
        else{
            $('.navbar').removeClass('shrink');
        }
    });
    
    
    
    /*------------------------------------*\
        Scroll to top.
    \*------------------------------------*/
    
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('.scroll-to-top').fadeIn();
        } 
        else{
            $('.scroll-to-top').fadeOut();
        }
    });
    
    
    
    $(document).ready(function(){
        
        /*------------------------------------*\
            Detect mobile device.
        \*------------------------------------*/        
        
        var isMobile = {
            Android: function(){
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function(){
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function(){
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function(){
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function(){
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function(){
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        
        
        
        /*------------------------------------*\
            Bootstrap scrollspy.
        \*------------------------------------*/
        
        var ww = Math.max($(window).width(), window.innerWidth),
            navHeight = 80,
            navHeightShrink = 61;
        
        $(window).smartload(function(){
            $body.scrollspy({    
                target: '#navigation',
                offset: ww > 992 ? navHeightShrink : navHeight
            });
        });
        
        // $(window).smartresize(function(){
        //     var dataScrollSpy = $body.data('bs.scrollspy'),
        //         ww = Math.max($(window).width(), window.innerWidth),
        //         offset = ww > 992 ? navHeightShrink : navHeight;
        
        //     dataScrollSpy.options.offset = offset;
        //     $body.data('bs.scrollspy', dataScrollSpy);
        //     $body.scrollspy('refresh');
        // });
        
        
        
        /*------------------------------------*\
            Page scrolling feature.
        \*------------------------------------*/
        
        $(window).smartload(function(){
            pageScroll();
        });
        
        $(window).smartresize(function(){
            pageScroll();
        });
        
        function pageScroll(){
            $('a.page-scroll').bind('click', function(e){
                var ww = Math.max($(window).width(), window.innerWidth),
                    anchor = $(this),
                    href = anchor.attr('href'),
                    offset = ww > 992 ? navHeightShrink : navHeight;

                    $('nav.navbar ul li a').removeClass('active');
                    $(this).addClass('active');

                $('html, body').stop().animate({
                    scrollTop: $(href).offset().top - (offset - 1)
                }, 1000, 'easeInOutExpo');
                
                // Automatically retract the navigation after clicking on one of the menu items.
                $('.navbar-collapse').collapse('hide');
                
                e.preventDefault();
            });
        };
        
        
        
        /*------------------------------------*\
            Gallery grid
        \*------------------------------------*/   
        
        if ($.fn.imagesLoaded && $.fn.isotope){
            var $galleryGrid = $('.gallery-grid');
            
            $(window).smartload(function(){
                $galleryGrid.imagesLoaded(function(){
                    $galleryGrid.isotope({
                        itemSelector: '.item',
                        layoutMode: 'masonry'
                    });
                });
            });
            
            $(window).smartresize(function(){
                $galleryGrid.isotope('layout');
            });

            // Gallery filtering
            var $gridSelectors = $('.gallery-filter').find('a');
            $gridSelectors.bind('click', function(e){
                $gridSelectors.parent().removeClass('active');
                $(this).parent().addClass('active');

                var selector = $(this).attr('data-filter');
                $galleryGrid.isotope({
                    filter: selector
                });            

                e.preventDefault();
            });
        }
        else{
            console.log('Gallery grid: Plugin "imagesLoaded" is not loaded.');
            console.log('Gallery grid: Plugin "isotope" is not loaded.');
        }
        
        // Gallery magnific popup
        if ($.fn.magnificPopup){
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                fixedContentPos: false,
                mainClass: 'mfp-fade',
                gallery:{
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }
        else{
            console.log('Gallery magnific popup: Plugin "magnificPopup" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Counter number
        \*------------------------------------*/
        
        if ($.fn.countTo){
            $('.timer').one('inview', function(isInView){
                if(isInView){
                    $(this).countTo();
                }
            });
        }
        else{
            console.log('Counter Number: Plugin "countTo" is not loaded.');
        }
        
        
        
        /*------------------------------------*\
            Features box
        \*------------------------------------*/        
        
        var $featuresBox = $('.features-box');
        
        if(isMobile.any()){
            $featuresBox.find('.show-on-hover').addClass('disabled');
            $featuresBox.bind('click', function(e){
                $featuresBox.find('.show-on-hover').removeClass('active');
                $(this).find('.show-on-hover').addClass('active');
                e.preventDefault();
            });
        };
        
        
        
        /*------------------------------------*\
            DEMO
        \*------------------------------------*/
        
        // Home bg parallax (requires scrollmagic)
        if(typeof ScrollMagic !== 'undefined'){
            // Init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
        
            // Build scenes
            new ScrollMagic.Scene({triggerElement: ".home-bg-parallax"})
                    .setTween(".home-bg-parallax > .bg-parallax", {y: "80%", ease: Linear.easeNone})
                    .addTo(controller);
        }
        

        /* Height slideshow 2 */
        if( $('.ova_slideshow_two').length > 0 ){
            var w_h = $(window).height();
            $('.ova_slideshow_two').css('height', w_h );
            $('.ova_slideshow_two .ova_static_bg').css('height', w_h );
        }


        if ($.fn.flexslider){
            $('.bg-slideshow-wrapper').each(function(){
                
                var time_next = parseInt($(this).data('time_next'));
                var dis_nav = $(this).data('dis_nav');
                var dis_dot = $(this).data('dis_dot');

                    $(this).flexslider({
                    selector: '.slides > .bg-cover',
                    easing: 'linear',
                    slideshowSpeed: time_next,
                    controlNav: dis_dot,
                    directionNav: dis_nav,
                    prevText: "<i class='fa fa-arrow-circle-o-left'></i>",
                    nextText: "<i class='fa fa-arrow-circle-o-right'></i>",
                    keyboard: false,
                    animationLoop: true,
                    pauseOnAction: false,
                    touch: false
                });    
            })
            
        }
        else{
            console.log('Home bg slideshow: Plugin "flexslider" is not loaded.');
        }
        
        
        // Home bg slider (requires flickity)
        if ($.fn.flickity){
            $('.bg-slider-wrapper').each(function(){

                

                var time_next = parseInt($(this).data('time_next'));
                var dis_nav = $(this).data('dis_nav');
                var dis_dot = $(this).data('dis_dot');

                $(this).flickity({
                    cellAlign: 'left',
                    contain: true,
                    prevNextButtons: dis_nav,
                    pageDots: dis_dot,
                    draggable: false,
                    autoPlay: time_next,
                    pauseAutoPlayOnHover: false
                });
            });
            
        }
        else{
            console.log('Home bg slider: Plugin "flickity" is not loaded.');
        }


        
        
        // Animated typing
        if ($.fn.typed){
            $('.typed-strings').each(function(){
                 var string = $(this).data('animated_text');
                 var typespeed = $(this).data('typespeed');
                 var loop = $(this).data('loop');
                 var backDelay = $(this).data('backdelay');
                
                    $(this).typed({
                        strings: string.split(","),
                        typeSpeed: parseInt(typespeed),
                        loop: loop,
                        backDelay: parseInt(backDelay),
                        showCursor: false
                    });
            });
            
            
        }
        else{
            console.log('Animated typing: Plugin "typed" is not loaded.');
        }
        
        
        // Countdown
        // if ($.fn.countdown){
        //     var $clock = $('#clock'),
        //         untilDate = $clock.data('until-date');

        //     $clock.countdown(untilDate, function(e){
        //         $(this).html(e.strftime(''
        //             + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%D</span><span class="display-block text-small">Days</span></div></div></div>'
        //             + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%H</span><span class="display-block text-small">Hr</span></div></div></div>'
        //             + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%M</span><span class="display-block text-small">Min</span></div></div></div>'
        //             + '<div class="clock-item"><div class="display-table height-100 width-100"><div class="display-table-cell vertical-align-middle"><span class="display-block xs-text-extra-large title-medium">%S</span><span class="display-block text-small">Sec</span></div></div></div>'));
        //     });
        // }
        // else{
        //     console.log('Countdown: Plugin "countdown" is not loaded.');
        // }
        
        if( $('.clock').length > 0){
            $('.clock').each(function(){

                var years = $(this).data('years');
                var months = $(this).data('months');
                var weeks = $(this).data('weeks');
                var days = $(this).data('days');
                var hours = $(this).data('hours');
                var minutes = $(this).data('minutes');
                var seconds = $(this).data('seconds');

                var year = $(this).data('year');
                var month = $(this).data('month');
                var week = $(this).data('week');
                var day = $(this).data('day');
                var hour = $(this).data('hour');
                var minute = $(this).data('minute');
                var second = $(this).data('second');

                var end_date_y = $(this).data('end_date_y');
                var end_date_m = $(this).data('end_date_m')-1;
                var end_date_d = $(this).data('end_date_d');
                var end_date_h = $(this).data('end_date_h');
                var end_date_i = $(this).data('end_date_i');

                

                var timezone = $(this).data('timezone');
                var display_format = $(this).data('display_format');


                var austDay = new Date();
                austDay = new Date(end_date_y, end_date_m, end_date_d, end_date_h, end_date_i);
                
               $(this).countdown({
                    labels: [years,months,weeks,days,hours,minutes,seconds], 
                    labels1: [year,month,week,day,hour,minute,second], 
                    until: austDay, 
                    timezone: timezone, 
                    format: display_format
                });
            });   
        }
        
         

        
        // Section - Schedule (requires flickity)
        if ($.fn.flickity){
            var $carouselSchedule = $('.carousel-schedule');
            $carouselSchedule.flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false
            });
            
            $('.nav-tabs', '#schedule').children().bind('click', function(e){
                $('.carousel-schedule').flickity('select', $(this).index());
            });
            
            if(isMobile.any()){
                var flkty = $carouselSchedule.data('flickity');
                $carouselSchedule.on('select.flickity', function(){
                    $('.nav-tabs', '#schedule').find('li:eq(' + flkty.selectedIndex + ') a').tab('show');
                });
            };
        }
        else{
            console.log('Section - Schedule: Plugin "flickity" is not loaded.');
        }
        
        
        // Section - FAQ (Accordions)
        $('.panel-group').each(function(){
            var $panelGroupId = $('#' + $(this).attr('id'));
            
            $(this).find('a').bind('click', function(e){
                $panelGroupId.find('.panel').removeClass('active');
                $(this).parent().parent().parent().addClass('active');
            });
        });
        
        
        
        
        
       
    });
})(jQuery);