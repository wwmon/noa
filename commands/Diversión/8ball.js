module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: '8ball',
      description: 'Realiza una pregunta para ser respondida por la bola mágica',
      usage: prefix => `\`${prefix}8ball <pregunta>\``,
      examples: prefix => `\`${prefix}8ball ¿Soy guapo?\``,
      enabled: true,
      aliases: ['bola8'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs pregúntale algo a la bola mágica', usage: this.help.usage(message.prefix), message }));
      else {
        let EightBall = Math.floor(Math.random() * 3) + 1;
        embed.setTitle(':8ball: La bola mágica').addField('Has preguntado:', args.join(' '));
        if (EightBall === 1) {
          embed
            .setColor(client.fns.selectColor('green'))
            .addField('Mi respuesta es:', client.fns.ball8('yes', 'text'))
            .setImage(client.fns.ball8('yes', 'gif'));
          message.channel.send({ embed });
        } else if (EightBall === 2) {
          embed
            .setColor(client.fns.selectColor('red'))
            .addField('Mi respuesta es:', client.fns.ball8('no', 'text'))
            .setImage(client.fns.ball8('no', 'gif'));
          message.channel.send({ embed });
        } else {
          embed
            .setColor(client.fns.selectColor('yellow'))
            .addField('Mi respuesta es:', client.fns.ball8('maybe', 'text'))
            .setImage(client.fns.ball8('maybe', 'gif'));
          message.channel.send({ embed });
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
