$(document).ready(function() {

    // refactor paragraph to act as select
    $(".custom-select").click(function() {
        $(".select-dropdown").slideToggle();

    });
    $(".select-dropdown").on("click", "li", function() {
        //default value
        $(".order").val("01-01-2017");

        var value = $(this).attr("data-value");
        var text = $(this).text();

        $(".order").val(value);
        $(".custom-select").text(text);

        $(this).parent().slideUp();
    });

    // swap images on hover over product menu
    $(".product-menu li").mouseover(function() {
        var orgSource = $(this).children().attr("src");
        var newSource = orgSource.replace(".png", "-hover.png");
        $(this).children().attr("src", newSource);
        $(".product-menu li").mouseout(function() {
            $(this).children().attr("src", orgSource);
        });
    });


    // modal register form validation
    function validate(e) {
        var name = $(".register input[name=name]").val();
        var lastName = $(".register input[name=last-name]").val();
        var email = $(".register input[name=email]").val();
        var phone = $(".register input[name=phone]").val();
        var password = $(".register input[name=password]").val();
        var errors = 0;

        // validate name
        if (name.length === 0) {
            $(".name-error").html("*Ime je obavezno polje.");
            errors++;
        } else if (name.length < 3 || name.length > 15) {
            $(".name-error").html("*Ime mora biti dužine između 3 i 15 karaktera.");
            errors++;
        }
        // validate last name
        if (lastName.length === 0) {
            $(".last-name-error").html("*Prezime je obavezno polje.");
            errors++;
        } else if (lastName.length < 3 || name.length > 20) {
            $(".last-name-error").html("*Prezime mora biti dužine između 3 i 20 karaktera.");
            errors++;
        }
        // validate email
        if (email.length === 0) {
            $(".email-error").html("*Email adresa je obavezno polje.");
            errors++;
        } else if (email.indexOf("@") === -1) {
            $(".email-error").html("*Email adresa mora biti validna.");
            errors++;
        }
        // validate phone number
        if (phone.length === 0) {
            $(".phone-error").html("*Kontakt telefon je obavezno polje.");
            errors++;
        } else if (isNaN(parseInt(phone))) {
            $(".phone-error").html("*Kontakt telefon mora biti validan.");
            errors++;
        }

        // check for errors
        if (errors > 0) {
            e.preventDefault();
        }
    }
    // submit event
    $(".register .login-btn").click(function(e) {
        validate(e);
    });

    // open product submenu
    $(".product-menu").on("click", "li", function() {
        $(".product-submenu").hide();
        var menu = $(this).attr("data-open");
        var submenu = $("#" + menu);
        submenu.slideDown(600);
    });

    // product nav collapse
    $(".product-nav-collapse").click(function() {
        $(".product-submenu").slideUp();
        $(".product-menu").slideToggle();
    });

    // product filter category collapse
    $(".category .sub-filter-collapse").click(function() {
        $(this).next().slideToggle();
        $(this).children().toggleClass("fa-plus");
        $(this).children().toggleClass("fa-minus");
    });

    // jquery slider
    $(function() {
        $("#slider").slider({
            range: true,
            min: 100,
            max: 10000,
            values: [100, 10000],
            step: 50,
            slide: function(e, element) {
                $(".price-range span:first").text(element.values[0] + "din");
                $(".price-range span:last").text(element.values[1] + "din");
            }
        });
        $(".price-range span:first").text($("#slider").slider("values", 0) + "din");
        $(".price-range span:last").text($("#slider").slider("values", 1) + "din");
    });

    $("#slider .ui-slider-handle").append("span");



});
