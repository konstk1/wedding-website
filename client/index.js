$(function() {
    console.log('jquery ready');

    if (isMobile()) {
        console.log('Mobile device');
        $('.modal-trigger').removeClass('modal-trigger').attr('href', 'rsvp');
    }

    updateDataScroll();

    $('.parallax').parallax();
    $('.button-collapse').sideNav({
        closeOnClick: true
    });

    $('.modal-trigger').leanModal({
        complete: function() {
          $('#rsvp-body').removeClass('hide');
          $('#rsvp-submitted').addClass('hide');
        }
    });

    smoothScroll.init({
        speed: 500,
        easing: 'easeInOutCubic',
        offset: 70,
        updateURL: false,
        callbackBefore: function (toggle, anchor) {},
        callbackAfter: function (toggle, anchor) {}
    });

    $.validator.setDefaults({
        errorClass: 'invalid',
        validClass: 'valid',
        errorPlacement: function (error, element) {
            if ($(element).attr('name') == "rsvp_group") {
              $(element).parent().addClass('error-box');
            } else {
              $(element).closest("form")
              .find("label[for='" + element.attr("id") + "']")
              .attr('data-error', error.text());
            }
        },
        submitHandler: function (form, event) {
            console.log(event.type);
            event.preventDefault();
            $.ajax({
                url: 'rsvp',
                type: 'POST',
                data: $(form).serialize(),
                success: function() {
                    console.log('Coming: ' + form.rsvp_group.value);
                    console.log('Post success');
                    $('#rsvp-body').addClass('hide');
                    $('#rsvp-submitted').removeClass('hide');
                }
            });
        }
    });

     $('#rsvp-form').validate();

    $('input[name="rsvp_group"]').change(function() {
        $(this).parent().removeClass('error-box');
    });

    $('#bringing_guest').change(function() {
        $('#guest_name').prop('disabled', !this.checked);
    });

    $('select').material_select();
    $('.slider').slider({full_width: false});
});

console.log('Main Ready');

function isMobile() {
    console.log("Navigator: " + navigator.userAgent);
    //console.log("Width: " + $(window).width());
    //return $(window).width() < 900;
    return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
}

function updateDataScroll() {
    console.log('Path: ' + window.location.pathname);
    if (window.location.pathname == '/rsvp') {
        $('.nav-wrapper ul li a').removeAttr('data-scroll');
    }
}