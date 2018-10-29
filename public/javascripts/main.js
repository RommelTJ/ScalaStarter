$("#urlInputForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            if (data != null && data.title != null && data.title !== "") {
                var title = data.title;
                insertAlert(title);
            }
        }, 
        error: function (error) {
            var myInput = $("#inputURL").val();
            insertAlert(myInput + " is not a valid URL. Please try again.");
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

function insertAlert(title) {
    $("#chatmeter-alert-section").empty();

    var htmlString = "<div class='alert alert-primary chatmeter-alert' role='alert'>";
    htmlString += title;
    htmlString += "</div>";

    $("#chatmeter-alert-section").html(htmlString);
}
