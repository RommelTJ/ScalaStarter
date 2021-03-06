/**
 * AJAX submission of the URL.
 */
$("#urlInputForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');

    // Client-side validation for handling special cases like 'cnn.com' (i.e. missing protocol information).
    var myInput = $("#inputURL").val();
    if (myInput != null && !myInput.startsWith("http")) {
        myInput = "https://" + myInput;
    }
    if (isUrlValid(myInput)) {
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            beforeSend: function() {
                insertAlert("Please wait...");
            },
            success: function(data) {
                if (data != null && data.title != null && data.title !== "") {
                    var title = data.title;
                    insertAlert(title);
                } else {
                    insertAlert(myInput + " is not a valid URL. Please try again.");
                }
            },
            error: function (error) {
                insertAlert(myInput + " is not a valid URL. Please try again.");
            }
        });
    } else {
        insertAlert(myInput + " is not a valid URL. Please try again.");
    }

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

/**
 * Binding to the inputURL field so we can clear the alert if the inputForm field is empty.
 */
$("#inputURL").bind('keyup', function (e) {
    var myInput = $("#inputURL").val();
    if (myInput != null && myInput === "") {
        $("#chatmeter-alert-section").empty();
    }
});

/**
 * Inserts a title under the form.
 * @param title
 */
function insertAlert(title) {
    $("#chatmeter-alert-section").empty();

    var htmlString = "<div class='alert alert-primary chatmeter-alert' role='alert'>";
    htmlString += title;
    htmlString += "</div>";

    $("#chatmeter-alert-section").html(htmlString);
}

/**
 * Big Regex that handles most cases of valid URLs. Returns true if url is valid, false otherwise.
 * @param url
 * @returns {boolean}
 */
function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}