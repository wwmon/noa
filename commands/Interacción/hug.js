module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'hug',
      description: 'Demuestra tu cariño, abrazando a un usuario',
      usage: prefix => `\`${prefix}hug <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) {
        embed
          .setDescription(client.fns.reply('hug', message))
          .setColor(client.fns.selectColor('lightcolors'))
          .setImage(client.fns.gifs(this.help.name));
        message.channel.send({ embed });
        return;
      }
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: 'red', razón: 'aprecio tu cariño pero no gracias uwu', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs menciona a esa persona que tanto quieres', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** abrazó a **' + message.mentions.users.first().username + '**')
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
