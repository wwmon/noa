module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'reverse',
      description: '¡Revise un pequeño giro en tu texto!',
      usage: prefix => `\`${prefix}reverse <texto>\``,
      examples: prefix => `\`${prefix}reverse ¡Hola, soy nuevo!\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe el texto para ponerlo al revés', usage: this.help.usage(message.prefix), message }));
      else {
        let sreverse = args
          .join()
          .split('')
          .reverse()
          .join('');
        if (args[0].toLowerCase() === sreverse) sreverse = `${args.join(' ')}... Espera... ¡Lo rompiste!`;
        embed
          .setAuthor(`${message.author.tag}`, message.author.avatarURL())
          .setColor(client.fns.selectColor('lightcolors'))
          .addField('Texto normal: ', '```\n' + `${args.join(' ')}` + '\n```')
          .addField('Texto en reversa: ', '```\n' + `${sreverse}` + '\n```');
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
