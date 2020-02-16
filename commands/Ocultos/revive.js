module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'revive',
      description: 'Comando Oculto #3\n\n¡Revive a tus aliados!',
      usage: prefix => `\`${prefix}revive <@usuario>\``,
      examples: prefix => `\`${prefix}revive Javi ϟ#3600\``,
      enabled: true,
      guildOnly: true,
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
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'no puedes revivirte a ti mism@', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: 'red', razón: 'yo estoy más que viva', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'menciona a quien quieres resucitar', usage: this.help.usage(message.prefix), message }));
      embed
        .setDescription('**' + message.author.username + '** revivió a **' + message.mentions.users.first().username + '**')
        .setColor(client.fns.selectColor('lightcolors'))
        .setImage(client.fns.gifs('revive'));
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
