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
      if (message.mentions.users.first() === message.author) return message.channel.send('Si solamente quieres despedirte, puedes utilizar `' + message.prefix + 'bye` ^^');
      if (message.mentions.users.first() === client.user) return message.channel.send('¿En serio me quieres decir adiós? T-T');
      if (message.mentions.users.size < 1) return message.channel.send('D-decide a quién q-quieres decirle adiós T-T');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** se despidió de **' + message.mentions.users.first().username + '**')
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
