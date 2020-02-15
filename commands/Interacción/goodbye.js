module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'goodbye',
      description: 'Despidete de un usuario en específico',
      usage: prefix => `\`${prefix}goodbye <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['adios', 'adiós', 'despedir'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.cache.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: `si solamente quieres despedirte usa \`${message.prefix}bye\``, usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.cache.first() === client.user) return message.channel.send(client.message({ emoji: 'sad', razón: '¿en serio quieres decirme adiós?', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.cache.size < 1) return message.channel.send(client.message({ emoji: 'sad', razón: 'noargs menciona a alguien para despedirte', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** se despidió de **' + message.mentions.users.cache.first().username + '**')
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
