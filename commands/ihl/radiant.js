const logger = require('../../lib/logger');
const IHLCommand = require('../../lib/ihlCommand');
const {
    findUser,
} = require('../../lib/ihlManager');
const Lobby = require('../../lib/lobby');
const CONSTANTS = require('../../lib/constants');

/**
 * @class RadiantCommand
 * @extends IHLCommand
 */
module.exports = class RadiantCommand extends IHLCommand {
    constructor(client) {
        super(client, {
            name: 'radiant',
            group: 'ihl',
            memberName: 'radiant',
            guildOnly: true,
            description: 'Select radiant side.',
        });
    }

    async onMsg({ msg, guild, lobbyState, inhouseUser }) {
        logger.silly('RadiantCommand');
        const captain = inhouseUser;
        if (Lobby.isCaptain(lobbyState)(captain)) {
            logger.silly(`RadiantCommand isCaptain ${captain.id}`);
            await this.ihlManager[CONSTANTS.EVENT_SELECTION_SIDE](lobbyState, captain, 1);
        }
    }
};
