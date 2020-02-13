module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'secret',
      description: 'Susurra un secreto a tus amigos de confianza',
      usage: prefix => `\`${prefix}secret <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['secreto'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('Lo siento **' + message.author.username + '**, no te puedes contar un secreto a ti solo');
      if (message.mentions.users.first() === client.user) return message.channel.send('No me gusta que me cuenten secretos... n.n');
      if (message.mentions.users.size < 1) return message.channel.send('¿Quién s-será la persona que sabrá el s-secreto?');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dijo un secreto a **' + message.mentions.users.first().username + '**')
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
