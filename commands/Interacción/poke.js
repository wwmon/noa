module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'poke',
      description: 'Molesta un poco al que tú quieras',
      usage: prefix => `\`${prefix}poke <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['molestar', 'disturb'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let img = await require('node-superfetch').get('https://nekos.life/api/v2/img/poke');
      if (message.mentions.users.first() === client.user) return message.channel.send(client.message({ emoji: '<:noaMonGun:672934974319493150>', razón: 'que ni se te ocurra', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() === message.author) {
        embed
          .setDescription('**' + message.author.username + '** me gusta molestarte :)')
          .setColor(client.fns.selectColor('lightcolors'))
          .setImage(img.body.url);
        message.channel.send(embed);
        return;
      }
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs ¿a quién quieres molestar?', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** molesta a **' + message.mentions.users.first().username + '**')
        .setImage(img.body.url);
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
