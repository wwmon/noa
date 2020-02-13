module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'flipcoin',
      description: 'Juega a tirar la moneda para obtener cara o cruz',
      usage: prefix => `\`${prefix}flipcoin\``,
      examples: prefix => `\`${prefix}flipcoin\``,
      enabled: true,
      aliases: ['coinflip', 'coin'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let roll = Math.floor(Math.random() * 2) + 1;
      embed.setColor(client.fns.selectColor('lightcolors'));
      if (roll === 1) {
        embed.setTitle(`${message.author.username}, obtuviste: Cruz`).setImage('https://i.imgur.com/s79TNS3.png');
        message.channel.send({ embed });
      } else {
        embed.setTitle(`${message.author.username}, obtuviste: Cara`).setImage('https://i.imgur.com/oAI9Chd.png');
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
