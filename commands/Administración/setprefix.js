module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'setprefix',
      description: 'Cambia el prefijo del servidor',
      usage: prefix => `\`${prefix}setprefix <prefijo>\``,
      examples: prefix => `\`${prefix}setprefix !!\``,
      enabled: true,
      guildOnly: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: ['MANAGE_GUILD'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas escribir el nuevo prefijo', usage: this.help.usage(message.prefix), message }));
      else {
        if (args[0].length >= 10) message.channel.send(client.message({ emoji: 'red', razón: 'el prefijo no puede exceder de los 10 carácteres', message }));
        else {
          message.channel.send(client.message({ emoji: 'green', razón: `el prefijo del servidor ha sido cambiado a \`${args[0]}\``, usage: this.help.usage(message.prefix), message }));
          data.guild.prefix = args[0];
          data.guild.save();
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
