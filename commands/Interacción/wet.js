module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'wet',
      description: 'Moja a un usuario',
      usage: prefix => `\`${prefix}wet <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['splash', 'mojar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'si te mojas, te regañarán', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: '<:noaMonGun:672934974319493150>', razón: 'no te atrevas...', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: ':sweat_drops:', razón: 'noargs menciona a quien mojarás', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está mojando a **' + message.mentions.users.first().username + '**')
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
