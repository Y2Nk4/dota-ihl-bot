const CONSTANTS = require('../lib/constants');

module.exports = (sequelize, DataTypes) => {
    const Bot = sequelize.define('Bot', {
        steamid_64: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        account_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        persona_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: CONSTANTS.BOT_OFFLINE,
        },
        lobby_count: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, { underscored: true });
    Bot.associate = (models) => {
        Bot.hasMany(models.Lobby);
        Bot.belongsToMany(models.Ticket, { through: models.BotTicket });
    };
    return Bot;
};
