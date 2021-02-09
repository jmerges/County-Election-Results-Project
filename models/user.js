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
  return User;
};