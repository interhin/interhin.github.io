let circle = document.querySelector(".circle");
let svg = document.querySelectorAll("circle");
for (let s of svg) {
    s.setAttribute("r",circle.clientHeight/2+10);
}

$(document).ready(function(){
      $(".specialists-list").slick({
        arrows:true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 850,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 576,
              settings: {
                arrows:false,
                slidesToShow: 1,
                slidesToScroll: 1
             }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      });

      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
});