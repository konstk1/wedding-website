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
        submitHandler: function (form) {
            console.log('form ok');
            form.submit();
        }
    });

    $("#rsvp-form").validate({
    });

    $('input[name="rsvp_group').change(function() {
        $(this).parent().removeClass('error-box');
    });

    $("#bringing_guest").change(function() {
        $("#guest_name").prop('disabled', !this.checked);
    });

    $(document).ready(function() {
        $('select').material_select();
        $('.slider').slider({full_width: false});
    });
});

console.log('Main Ready');