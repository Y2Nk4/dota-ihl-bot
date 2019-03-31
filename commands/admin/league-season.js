const IHLCommand = require('../../lib/ihlCommand');
const {
    createSeason,
} = require('../../lib/db');

/**
 * @class LeagueSeasonCommand
 * @extends IHLCommand
 */
module.exports = class LeagueSeasonCommand extends IHLCommand {
    constructor(client) {
        super(client, {
            name: 'league-season',
            group: 'admin',
            memberName: 'league-season',
            guildOnly: true,
            description: 'Start a new inhouse league season.',
            examples: ['league-season 2'],
            args: [
                {
                    key: 'name',
                    prompt: 'Provide a season name.',
                    type: 'string',
                },
            ],
        }, {
            inhouseAdmin: true,
            inhouseState: true,
            lobbyState: false,
            inhouseUser: false,
        });
    }

    async onMsg({ msg, guild }, { name }) {
        await createSeason(guild.id)(name);
        await msg.say(`New season ${name} started.`);
    }
};
