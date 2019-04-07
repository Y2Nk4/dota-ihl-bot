const logger = require('../../lib/logger');
const IHLCommand = require('../../lib/ihlCommand');
const Guild = require('../../lib/guild');
const Fp = require('../../lib/util/fp');

/**
 * @class ChallengeListCommand
 * @extends IHLCommand
 */
module.exports = class ChallengeListCommand extends IHLCommand {
    constructor(client) {
        super(client, {
            name: 'challenge-list',
            aliases: ['challenges'],
            group: 'challenge',
            memberName: 'challenge-list',
            guildOnly: true,
            description: 'View your current challenges.',
            examples: ['challenge-list', 'challenges'],
        }, {
            lobbyState: false,
        });
    }

    async onMsg({ msg, guild, inhouseUser }) {
        logger.debug(`ChallengeListCommand`);
        const receivers = await Fp.mapPromise(async (challenge) => {
            const receiver = await challenge.getRecipient();
            return Guild.resolveUser(guild)(receiver);
        })(inhouseUser.getChallengesGiven());
        logger.debug(`ChallengeListCommand receivers ${receivers}`);
        
        const givers = await Fp.mapPromise(async (challenge) => {
            const giver = await challenge.getGiver();
            return Guild.resolveUser(guild)(giver);
        })(inhouseUser.getChallengesReceived());
        logger.debug(`ChallengeListCommand givers ${givers}`);
        
        let text = '';
        
        if (receivers.length) {
            text += 'Challenges given to: ';
            text += receivers.join(', ');
        }
        else {
            text += 'No challenges given.';
        }
        
        if (givers.length) {
            text += '\nChallenges received from: ';
            text += givers.join(', ');
        }
        else {
            text += '\nNo challenges received.';
        }
        
        await msg.say(text);
    }
};
