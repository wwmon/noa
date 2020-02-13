module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'rate',
      description: 'Púntua el texto que tu elijas',
      usage: prefix => `\`${prefix}rate <texto>\``,
      examples: prefix => `\`${prefix}rate ¿Qué tan feo soy?\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs escribe el texto a puntuar', usage: this.help.usage(message.prefix), message }));
      else {
        let punt = Math.floor(Math.random() * 11),
          stars = '';
        if (punt === 0) {
          stars = '<:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 1) {
          stars = '⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 2) {
          stars = '⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 3) {
          stars = '⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 4) {
          stars = '⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 5) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 6) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 7) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 8) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448> <:blackstar:606234633557901448>';
        } else if (punt === 9) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ <:blackstar:606234633557901448>';
        } else if (punt === 10) {
          stars = '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐';
        }
        embed
          .setTitle('📝 Puntuando el texto:')
          .setDescription(args.join(' '))
          .addField('Puntuación: ' + punt, stars)
          .setColor(client.fns.selectColor('lightcolors'));
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
