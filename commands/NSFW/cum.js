module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'cum',
      description: 'Corre como un caballo >.<',
      usage: prefix => `\`${prefix}cum [@usuario]\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      nsfwOnly: true,
      voteOnly: true,
      cooldown: 3,
      aliases: ['happyend'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author || !message.mentions.users.first()) {
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setDescription('**' + message.author.username + '** se corrió... O al menos lo intenta')
          .setImage(client.fns.gifs(this.help.name));
        message.channel.send({ embed });
      } else if (message.mentions.users.first() === client.user) message.channel.send(client.message({ emoji: ':sob:', razón: 'en mí no', usage: this.help.usage(message.prefix), message }));
      else {
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setDescription('**' + message.author.username + '** se corrió en **' + message.mentions.users.first().username + '**')
          .setImage(client.fns.gifs(this.help.name));
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
