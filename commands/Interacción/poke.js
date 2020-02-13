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
      if (message.mentions.users.first() === client.user) return message.channel.send('Ni lo intentes n.n');
      if (message.mentions.users.first() === message.author || !message.mentions.users.first()) {
        embed
          .setDescription('**' + message.author.username + '** me gusta molestarte :)')
          .setColor(client.fns.selectColor('lightcolors'))
          .setImage(img.body.url);
        message.channel.send(embed);
        return;
      }
      if (message.mentions.users.size < 1) return message.channel.send('¿A quién quieres molestar?');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** mordió a **' + message.mentions.users.first().username + '**')
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
