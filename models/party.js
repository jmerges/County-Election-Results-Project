module.exports = function (sequelize, DataTypes) {
    var Party = sequelize.define("Party", {
        partyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        electionYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        candidateVotes: {
            type: DataTypes.INTEGER
        },
        totalVotes: {
            type: DataTypes.INTEGER
        }
    });
    Party.associate = function(models) {
        Party.belongsTo(models.County, {
            foreignKey: {
                field: "countyId",
                allowNull: false
            }
        });
    }
    return Party;
}