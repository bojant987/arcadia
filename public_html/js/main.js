$(document).ready(function() {

    // refactor paragraph to act as select
    $(".custom-select").click(function(e) {
        $(".select-dropdown").slideToggle();
        e.stopPropagation();
    });

    $(document).click(function() {
        $(".select-dropdown").slideUp();
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

    // swap images on product menu hover
    $(".product-menu").on("mouseenter", ".submenu-open", function() {
        var icon = $(this).find(".menu-icon");
        var orgSource = icon.attr("src");
        var hoverSource = orgSource.replace(".png", "-hover.png");

        if (!$(this).hasClass("active-menu") && icon.attr("src").indexOf("hover") === -1) {

            icon.attr("src", hoverSource);
        }
        $(this).mouseleave(function() {
            if (!$(this).hasClass("active-menu")) {
                icon.attr("src", orgSource);
            }
        });


    });

    // open product submenu
    $(".product-menu").on("click", ".submenu-open", function() {
        var menu = $(this).attr("data-open");
        var submenu = $("#" + menu);

        var icon = !$(this).is($(".product-menu .active-menu")) ? $(".product-menu").find(".active-menu .menu-icon") : undefined;

        var hoverSource;
        var orgSource;
        if (icon !== undefined) {
            hoverSource = icon.attr("src");
            if (hoverSource !== undefined) {
                orgSource = hoverSource.replace("-hover.png", ".png");
                icon.attr("src", orgSource);
            }

        }

        $(this).siblings().removeClass("active-menu");


        $(this).toggleClass("active-menu");
        $(this).siblings().find(".product-submenu").hide();

        submenu.slideToggle(600);

    });

    // product nav collapse
    $(".product-nav-collapse").click(function() {
        var hoverSource = $(".product-menu").find(".active-menu .menu-icon").attr("src");

        if (hoverSource !== undefined) {
            var orgSource = hoverSource.replace("-hover.png", ".png");
            $(".product-menu").find(".active-menu .menu-icon").attr("src", orgSource);
        }


        $(".product-menu li").removeClass("active-menu");
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

            },
            // product price filtering
            stop: function(e, element) {
                var products = $(".all-products .product");
                for (var i = 0; i < products.length; i++) {
                    var price = $(".all-products .product:eq(" + i + ")").attr("data-price");
                    var dataId = $(".all-products .product:eq(" + i + ")").attr("data-id");
                    price = parseInt(price);
                    if (price < element.values[0] || price > element.values[1]) {
                        $(".all-products .product:eq(" + i + ")").parent().fadeOut();
                    } else {
                        $(".all-products .product:eq(" + i + ")").parent().fadeIn();
                    }
                }
            }

        });

        $(".price-range span:first").text($("#slider").slider("values", 0) + "din");
        $(".price-range span:last").text($("#slider").slider("values", 1) + "din");
    });

    $("#slider .ui-slider-handle").append("span");

    // single product modal
    function getIdentifiers() {
        var identifiers = [];
        $(".all-products .product").each(function() {
            if (typeof $(this).attr("data-id") !== typeof undefined && $(this).attr("data-id") !== false && $(this).is(":visible")) {
                identifiers.push($(this).attr("data-id"));
            }
        });
        return identifiers;
    }

    function setNewProduct(product) {
        var productId = product.find(".product-id").html();
        var productPriceOne = product.find("div.product-price:first").html();
        var productPriceTwo = product.find("div.product-price:last").html();
        var productName = product.find(".product-name").text();
        var imageSrc = product.find("img").attr("src");
        var newSrc = imageSrc.replace(".jpg", "-lg.jpg");
        var dataId = product.attr("data-id");

        $(".single-product-modal .single-product").attr("data-id", dataId);
        $(".single-product-modal .product-id").html(productId);
        $(".single-product-modal div.product-price:first").html(productPriceOne);
        $(".single-product-modal div.product-price:last").html(productPriceTwo);
        $(".single-product-modal .product-name").text(productName);
        $(".single-product-modal img").attr("src", newSrc);
    }

    $(".single-product-modal").on("show.bs.modal", function(e) {
        var which = $(e.relatedTarget);
        var product = which.parents(".product");

        setNewProduct(product);
    });

    $(".product-left").click(function() {
        var identifiers = getIdentifiers();
        var currentId = $(".single-product-modal .single-product").attr("data-id");
        var index = identifiers.findIndex(function(x) {
            return x === currentId;
        });
        var prevIndex;

        if (index === 0) {
            prevIndex = identifiers.length - 1;
        } else {
            prevIndex = index - 1;
        }

        var prevId = identifiers[prevIndex];
        var prevProduct = $(".all-products .product[data-id=" + prevId + "]");

        setNewProduct(prevProduct);

    });

    $(".product-right").click(function() {
        var identifiers = getIdentifiers();
        var currentId = $(".single-product-modal .single-product").attr("data-id");
        var index = identifiers.findIndex(function(x) {
            return x === currentId;
        });
        var nextIndex;

        if (index === identifiers.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = index + 1;
        }

        var nextId = identifiers[nextIndex];
        var nextProduct = $(".all-products .product[data-id=" + nextId + "]");

        setNewProduct(nextProduct);

    });

    // product category filtering


    
});
