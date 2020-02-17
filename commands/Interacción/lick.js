module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'lick',
      description: 'Lame a tu objetivo. UwU/',
      usage: prefix => `\`${prefix}lick <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['lamer'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'te diría que suerte lamiéndote, pero guatafo', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: 'red', razón: '¡NOOO! *- vomita -*', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs te veo ansioso, ¡menciona a alguien!', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está lamiendo a **' + message.mentions.users.first().username + '**')
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
