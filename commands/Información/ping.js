module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Revisa la latencia del bot y la API',
      usage: prefix => `\`${prefix}ping\``,
      examples: prefix => `\`${prefix}ping\``,
      enabled: true,
      aliases: ['latency'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      var ping = Math.floor(client.ws.ping);
      if (ping) {
        embed.setDescription('Analizando resultados, por favor espere unos segundos...').setColor(client.fns.selectColor('lightcolors'));
        let m = await message.channel.send({ embed });
        if (message.guild) {
          embed.setAuthor(`Latencia de ${client.config.bot}`, client.user.displayAvatarURL());
          if (ping >= 299) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('RED');
            await m.edit({ embed });
          } else if (ping >= 200) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('RED');
            await m.edit({ embed });
          } else if (ping >= 150) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('ORANGE');
            await m.edit({ embed });
          } else if (ping >= 100) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('ORANGE');
            await m.edit({ embed });
          } else if (ping >= 50) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('GREEN');
            await m.edit({ embed });
          } else if (ping < 49) {
            embed.setDescription(`**API ping:** ${ping} ms\n**Mensajería:** ${m.createdTimestamp - message.createdTimestamp}ms`).setColor('GREEN');
            await m.edit({ embed });
          }
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
