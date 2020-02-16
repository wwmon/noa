module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'giphy',
      description: 'Encuentra un gif al azar de tu elección. (No siempre encuentra lo que buscas)',
      usage: prefix => `\`${prefix}giphy <busqueda>\``,
      examples: prefix => `\`${prefix}giphy Leones\``,
      enabled: true,
      cooldown: 4,
      aliases: ['gif'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs agrega el nombre del GIF que quieres busar', usage: this.help.usage(message.prefix), message }));
      else {
        let gif = await require('gif-search').random(args[0])
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setImage(gif)
          .setAuthor('🔍 ' + args.join(' ') + '', message.author.displayAvatarURL());
        message.channel.send({ embed });
      }
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
