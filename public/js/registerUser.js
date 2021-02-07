$(document).ready(function() {
  // Getting references to our form and input
  var registerUser = $("#registerUserSubmit");
  var emailInput = $("input#username");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  registerUser.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    registerUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the registerUser route. If successful, we are redirected to the members page. Otherwise log any errors
  
  function registerUser(email, password) {
    $.post("/api/registerUser", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a modal alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
