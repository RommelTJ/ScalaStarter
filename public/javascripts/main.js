$("#urlInputForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            console.log("TITLE: " + data.title);
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
