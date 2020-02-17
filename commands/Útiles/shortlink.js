module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'shortlink',
      description: 'Acorta una URL de manera segura',
      usage: prefix => `\`${prefix}shortlink <url> <título>\``,
      examples: prefix => `\`${prefix}shortlink www.youtube.com MiVideoEnYT\``,
      enabled: true,
      cooldown: 4,
      aliases: ['shorten'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    const shorten = require('isgd');
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs', usage: this.help.usage(message.prefix), message }));
      else {
        if (!args[1]) {
          shorten.shorten(args[0], res => {
            if (res.startsWith('Error:')) message.channel.send(client.message({ emoji: 'red', razón: 'ingresa un enlace válido', usage: this.help.usage(message.prefix), message }));
            else message.channel.send(client.message({ emoji: 'green', razón: 'enlace acortado: <' + res + '>', usage: this.help.usage(message.prefix), message }));
          });
        } else {
          shorten.custom(args[0], args[1], res => {
            if (res.startsWith('Error:')) message.channel.send(client.message({ emoji: 'red', razón: '<' + res + '>', usage: this.help.usage(message.prefix), message }));
            else message.channel.send(client.message({ emoji: 'green', razón: 'enlace acortado con etiqueta <' + res + '>', usage: this.help.usage(message.prefix), message }));
          });
        }
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
