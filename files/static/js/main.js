$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#btn-show').hide();
    $('#btn-down').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#styles').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        $('#btn-show').hide();
        $('#btn-down').hide();
        // $('#btn-predict').hide();
        readURL(this);
    });


    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        $('.style-section').hide();
        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                // data = data.split(" ")
                $('#result').text(data);
                $('#btn-show').show();
                $('#btn-down').show();
                // $('#result').text(' Result2:  ' + data[1]);
                console.log('Success!');
            },
        });
    });

    $('#btn-show').click(function(){
        window.open("details");
    });
    $('#btn-down').click(function(){
        window.open("download");
    });

});