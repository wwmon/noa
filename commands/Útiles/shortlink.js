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
      if (!args[0]) return message.channel.send(`Especifique el enlace.\n> **Uso correcto:** \`${message.prefix}shortlink <URL> [título]\``);

      if (!args[1]) {
        shorten.shorten(args[0], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(`Por favor ingresa una URL válida`);
          message.channel.send(`URL acortada: **<${res}>**`);
        });
      } else {
        shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(`${res}`);
          message.channel.send(`URL acortada con etiqueta: **<${res}>**`);
        });
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
