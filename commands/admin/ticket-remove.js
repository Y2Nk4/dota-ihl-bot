const logger = require('../../lib/logger');
const IHLCommand = require('../../lib/ihlCommand');
const CONSTANTS = require('../../lib/constants');

/**
 * @class TicketRemoveCommand
 * @extends IHLCommand
 */
module.exports = class TicketRemoveCommand extends IHLCommand {
    constructor(client) {
        super(client, {
            name: 'ticket-remove',
            group: 'admin',
            memberName: 'ticket-remove',
            guildOnly: true,
            description: 'Remove a dota ticket from the league.',
            examples: ['ticket-remove 1063'],
            args: [
                {
                    key: 'leagueid',
                    prompt: 'Provide a ticket league id.',
                    type: 'integer',
                },
            ],
        }, {
            inhouseAdmin: true,
            inhouseState: true,
            lobbyState: false,
            inhouseUser: false,
        });
    }

    async onMsg({ msg, guild, league }, { leagueid }) {
        this.ihlManager.emit(CONSTANTS.EVENT_LEAGUE_TICKET_REMOVE, league, leagueid);
        await msg.say(`Removed ticket ${name} from the league.`);
    }
};
