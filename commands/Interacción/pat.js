module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pat',
      description: 'Da un poco de caricias con mucho amor al que tu desees',
      usage: prefix => `\`${prefix}pat <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['acariciar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let img = await require('node-superfetch').get('https://nekos.life/api/v2/img/pat');
      if (message.mentions.users.first() === message.author) return message.channel.send('No te puedes dar caricias solo... Sería **extraño**');
      if (message.mentions.users.first() === client.user) return message.channel.send('Odio las caricias');
      if (message.mentions.users.size < 1) return message.channel.send('¡Vamos! Elige a quién quieres acariciar');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** acarició a **' + message.mentions.users.first().username + '**')
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
