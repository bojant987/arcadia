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

});
