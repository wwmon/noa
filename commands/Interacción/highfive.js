module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'highfive',
      description: '¡Da los cinco a alguien\n¡Un saludo especial!',
      usage: prefix => `\`${prefix}highfive <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['chocalas'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'no te puedes dar los cinco a tí mism@...', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() === client.user) return message.channel.send(client.message({ emoji: 'red', razón: 'hoy no, ando ocupada', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs ¿con quién deseas dar los cinco?', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dio los cinco a **' + message.mentions.users.first().username + '**')
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
