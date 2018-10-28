$("#urlInputForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');
    console.log("URL: " + url);
    console.log("TODO: Check Title!");

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            console.log("TODO: Handle success: " + data);
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
