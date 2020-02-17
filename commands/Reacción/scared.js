module.exports = class command extends require('../../base/models/Command.js') {
    constructor(client) {
      super(client, {
        name: 'scared',
        description: 'Carece de valor en ciertas situaciones y demuestra tu poca resistencia al terror...',
        usage: prefix => `\`${prefix}scared\``,
        examples: prefix => `\`${prefix}scared\``,
        enabled: true,
        cooldown: 3,
        aliases: ['asustado'],
        botPermissions: [],
        memberPermissions: [],
        dirname: __dirname
      });
    }
    async run(message, args, data, embed) {
      let client = this.client;
      try {
        embed
          .setDescription(client.fns.reply(this.help.name, message))
          .setColor(client.fns.selectColor('lightcolors'))
          .setImage(client.fns.gifs(this.help.name));
        message.channel.send({ embed });
      } catch (e) {
        client.err({
          type: 'command',
          name: this.help.name,
          error: e,
          message
        });
      }
    }
  };
  