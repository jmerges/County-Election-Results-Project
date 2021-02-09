$(document).ready(function() {
  // Getting references to our form and input
  var registerUser = $("#registerUserSubmit");
  var username = $("#username");
  var userPassword = $("#userPassword");
  var userEmail = $("#userEmail");
 
  // When the signup button is clicked, we validate the email and password are not blank
  registerUser.on("click", function(event) {
    event.preventDefault();
    var userData = {
      username: username.val().trim(),
      password: userPassword.val().trim(),
      email: userEmail.val().trim()
    };
console.log(userData)
    if (!userData.username || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    registerUsers(userData.username, userData.email, userData.password);
    username.val("");
    userPassword.val("");
    userEmail.val("");
  });

  // Does a post to the registerUser route. If successful, we are redirected to the members page. Otherwise log any errors
  
  function registerUsers(username, email, password) {
    $.post("/api/registerUser", {
      username: username,
      password: password,
      email: email
    })
      .then(function(data) {
        window.location.replace("/homepage");
        // If there's an error, handle it by throwing up a modal alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
