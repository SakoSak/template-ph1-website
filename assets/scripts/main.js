$(".openbtn").click(function () {
    $(this).toggleClass('active');
    $(".hamburger").toggleClass('active');
    $(".main-container").toggleClass('inactive');
    $("footer").toggleClass('inactive');
});