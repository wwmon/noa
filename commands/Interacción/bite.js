module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bite',
      description: 'Si se te antoja moder a alguien, que mejor manera qué morder a tus amigos! Con este comando podrás dar mordiscos a otro usuario',
      usage: prefix => `\`${prefix}bite <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['morder'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('*¡Por favor! No me gusta que te muerdas.*');
      if (message.mentions.users.first() === client.user) return message.channel.send('Odio que me muerdan, nunca lo intentes');
      if (message.mentions.users.size < 1) return message.channel.send('Tienes hambre, decide a quién deseas morder');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** mordió a **' + message.mentions.users.first().username + '**')
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
