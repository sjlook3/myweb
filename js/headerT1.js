;(function($) {

    function navmenu(obj) {

        var $dim = $('.mobile .dim'),
            mobile = $('#header .mobile'),
            noMobile = $('#header .noMobile'),
            menu = "close";
        
        
        var winCheck = function (){
            
            windowWidth = window.innerWidth; 

            if (windowWidth <= 1024) {   
                mobile.removeClass('hide');
                noMobile.addClass('hide');
            } else {
                mobile.addClass('hide');
                noMobile.removeClass('hide');
            } 
        }
        
        window.addEventListener('load', winCheck, false);
        window.addEventListener('resize', winCheck, false);
        
                   
        // menu open/close
        $('.hamburger-menu').click(function (e) {
            
             e.preventDefault(); 
        
            if (menu === "close") {
                
                menu = "open";
                $(".hamburger-menu").toggleClass('open');
                
                $('.nav-mob').css({
                    'left': '0%',
                    'transform': 'translateX(0) translateY(0px)'
                });
                
                $(".nav-mob .inner2").css("transform", "translate(0%, 0)");

                $dim.fadeIn();
                
             } else {
                 
                 menu = "close";
                 $(".hamburger-menu").toggleClass('open');                 

                 $('.nav-mob').css({
                     'left': '-100%',
                     'transform': 'translateX(0) translateY(0px)'
                 });
                 
                 $(".nav-mob .inner2").css("transform", "translate(100%, 0)");

                 $dim.fadeOut();
                 
             } 
                        
        });
        
        
        $('.dim').click(function (e) {
            e.preventDefault();
            
            menu = "close";
            $(".hamburger-menu").toggleClass('open');
            
            $('.nav-mob').css({
                'left': '-100%',
                'transform': 'translateX(0) translateY(0px)'
            });
            
            $(".nav-mob .inner2").css("transform", "translate(100%, 0)");
            
            $dim.fadeOut();
            
        });
        
        $(".nav-mob").swipe({
            
            swipeLeft: function () {
                
                menu = "close";
                $(".hamburger-menu").toggleClass('open');
                
                $('.nav-mob').css({
                    'left': '-100%',
                    'transform': 'translateX(0) translateY(0px)'
                });
                
                $(".nav-mob .inner2").css("transform", "translate(100%, 0)");
                
                $dim.fadeOut();
            }            
        });
        
        
        // Search Toggle //
        $(".nav-pc .search").click(function () {
            $(".nav-pc ul").toggleClass("active");
            $(".nav-pc .search_box").toggleClass("search_box_active");
        });
        

    }
    navmenu();

})(jQuery);