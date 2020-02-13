module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'holdhands',
      description: 'Agarra / sostén la mano de un usuario',
      usage: prefix => `\`${prefix}holdhands <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['handholding'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No dejaré que sostengas tu propia mano e.e');
      if (message.mentions.users.first() === client.user) return message.channel.send('No gracias UwU');
      if (message.mentions.users.size < 1) return message.channel.send('¿A quién deseas sostener la mano?');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está tomando la mano de **' + message.mentions.users.first().username + '**')
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
