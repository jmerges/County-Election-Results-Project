module.exports = function (sequelize, DataTypes) {
    var State = sequelize.define("State", {
        stateName: {
            type: DataTypes.string,
            allowNull: false
        }
    });
    State.associate = function(models) {
        State.hasMany(models.County, {
            onDelete: "SET NULL"
        });
    }
    return State;
}