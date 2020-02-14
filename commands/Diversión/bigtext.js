module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bigtext',
      description: 'Enormece tu pequeño texto y hazlo lucir mucho mejor',
      usage: prefix => `\`${prefix}bigtext <texto>\``,
      examples: prefix => `\`${prefix}bigtext Soy enorme\``,
      enabled: true,
      aliases: ['emojify'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      const mapping = { ' ': '   ', '0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:', '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:', '!': ':grey_exclamation:', '?': ':grey_question:', '#': ':hash:', '*': ':asterisk:', á: ':regional_indicator_a:', é: ':regional_indicator_e:', í: ':regional_indicator_i:', ó: ':regional_indicator_o:', ú: ':regional_indicator_u:' };
      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
      });
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe un texto para agrandar', usage: this.help.usage(message.prefix), message }));
      else if (args.length > 80) message.channel.send(client.message({ emoji: 'red', razón: 'el texto no puede exceder los 80 carácters', message }));
      message.channel.send(
        args
          .join(' ')
          .split('')
          .map(c => mapping[c] || c)
          .join('')
      );
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
