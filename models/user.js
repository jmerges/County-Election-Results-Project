var bcrypt = require("bcrypt");
// create a new user to place into table
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // username must be entered
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // password must be entered
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // email must be entered
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.userPassword);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", function(user) {
      user.userPassword = bcrypt.hashSync(user.userPassword, bcrypt.genSaltSync(10), null);
    });
    return User;
};