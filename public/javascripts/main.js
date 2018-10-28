$("#urlInputForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');
    console.log("s: " + form.serialize());


    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            console.log("TODO: Handle success");
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
