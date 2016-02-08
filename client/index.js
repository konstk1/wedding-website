$(function() {
    console.log('jquery ready');
    $('.parallax').parallax();
    $('.button-collapse').sideNav({
        closeOnClick: true
    });
    $('.modal-trigger').leanModal();
    smoothScroll.init({
        speed: 500,
        easing: 'easeInOutCubic',
        offset: 70,
        updateURL: false,
        callbackBefore: function (toggle, anchor) {},
        callbackAfter: function (toggle, anchor) {}
    });
    $(document).ready(function() {
        $('select').material_select();
        $('.slider').slider({full_width: false});
    });
});

console.log('Main Ready');