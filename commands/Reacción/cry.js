module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'cry',
      description: 'Llena todos los océanos con tus propias lágrimas',
      usage: prefix => `\`${prefix}cry\``,
      examples: prefix => `\`${prefix}cry\``,
      enabled: true,
      cooldown: 3,
      aliases: [],
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
