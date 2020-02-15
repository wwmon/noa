module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fliptext',
      description: '¡Dale un giro a tu texto!',
      usage: prefix => `\`${prefix}fliptext <texto>\``,
      examples: prefix => `\`${prefix}fliptext Hola gente\``,
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
      let mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~',
        OFFSET = '!'.charCodeAt(0);
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs anímate y escribe el texto que dará un giro', usage: this.help.usage(message.prefix), message }));
      else {
        message.channel.send(
          args
            .join(' ')
            .split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse()
            .join('')
        );
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
