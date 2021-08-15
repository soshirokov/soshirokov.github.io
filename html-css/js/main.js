$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [0, 1000],
        slide: function (event, ui) {
            $('#priceStart').val("$" + ui.values[0]);
            $('#priceEnd').val("$" + ui.values[1]);
        }
    });

    $("#priceStart").val("$" + $("#slider-range").slider("values", 0));
    $("#priceEnd").val("$" + $("#slider-range").slider("values", 1));
});