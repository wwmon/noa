module.exports = class command extends require('../../base/models/Command.js') {
    constructor(client) {
      super(client, {
        name: 'claps',
        description: 'Mueve tus manos para aplaudir ante una situación.',
        usage: prefix => `\`${prefix}claps\``,
        examples: prefix => `\`${prefix}claps\``,
        enabled: true,
        cooldown: 3,
        aliases: ['aplaudir', 'clap'],
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
  