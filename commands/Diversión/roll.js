module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'roll',
      description: 'Lanza un dado y obtén un número al azar',
      usage: prefix => `\`${prefix}roll\``,
      examples: prefix => `\`${prefix}roll\``,
      enabled: true,
      aliases: ['throwdice', 'dice'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let intento = Math.floor(Math.random() * 7);
      if (intento === 1) {
        embed
          .setColor(client.fns.selectColor('red'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 1')
          .setImage('https://i.imgur.com/SVNKSUH.png');
        message.channel.send({ embed });
      } else if (intento === 2) {
        embed
          .setColor(client.fns.selectColor('red'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 2')
          .setImage('https://i.imgur.com/PqJLs95.png');
        message.channel.send({ embed });
      } else if (intento === 3) {
        embed
          .setColor(client.fns.selectColor('yellow'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 3')
          .setImage('https://i.imgur.com/qXzKGhY.png');
        message.channel.send({ embed });
      } else if (intento === 4) {
        embed
          .setColor(client.fns.selectColor('yellow'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 4')
          .setImage('https://i.imgur.com/YEM9Ti2.png');
        message.channel.send({ embed });
      } else if (intento === 5) {
        embed
          .setColor(client.fns.selectColor('green'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 5')
          .setImage('https://i.imgur.com/bHHdyql.png');
        message.channel.send({ embed });
      } else if (intento === 6) {
        embed
          .setColor(client.fns.selectColor('green'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 6')
          .setImage('https://i.imgur.com/YbpnXnm.png');
        message.channel.send({ embed });
      } else {
        embed
          .setColor(client.fns.selectColor('blue'))
          .setDescription(message.author.username + ', tiraste el dado, y cayó: 9... Rompiste el juego!')
          .setImage('https://i.imgur.com/to3YV2i.png');
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
