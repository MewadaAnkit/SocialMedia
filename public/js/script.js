$(document).ready(function() {
    $("#login_success").submit(function(event) {
       // event.preventDefault(); // Prevent the form from submitting normally
          alert('Login Success')
        // Send an AJAX request to the server to authenticate the user
        /*$.ajax({
            type: "POST",
            url: "/api/login",
            data: $("#login_success").serialize(),
            success: function(data) {
                // Show a success alert with Toastr
                alert("You are successfully logged in!");
                
                // Redirect the user to the home page
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Show an error message
                //alert.error("Login failed. Please try again.");
            }
        });*/
    });
 });
 