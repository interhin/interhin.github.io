$(document).ready(function() {
    if ($(window).width()>768) {
        $("a.zoom").fancybox({
            'overlayShow'	: false,
            'transitionIn'	: 'elastic',
            'transitionOut'	: 'elastic',
        });
        $(".zoom").find("img").addClass("img-fluid");
        $(".zoom").find("img").addClass("align-self-center");
    } else {
        $("a.zoom").removeAttr("href");
    }
});