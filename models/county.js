module.exports = function (sequelize, DataTypes) {
    var County = sequelize.define("County", {
        countyName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    County.associate = function(models) {
        County.belongsTo(models.State, {
            foreignKey: {
                field: "stateId",
                allowNull: false
            }
        });
        County.hasMany(models.Party, {
            onDelete: "SET NULL"
        });
    }
    return County;
}
