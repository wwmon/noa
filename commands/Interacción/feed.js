module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'feed',
      description: 'Comparte tu comida con alguien más',
      usage: prefix => `\`${prefix}feed <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['alimentar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('Si quieres comer utiliza `' + message.prefix + 'eat` u.u');
      if (message.mentions.users.first() == client.user) return message.channel.send('Muchas gracias por intentar darme de comer, pero no tengo hambre :(');
      if (message.mentions.users.size < 1) return message.channel.send('Antes que nada, ¡Gracias por tu solaridad!. Pero debes elegir a quién quieres dar de comer...');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dio de comer a **' + message.mentions.users.first().username + '**')
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
