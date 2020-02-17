module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'translate',
      description: 'Traduce un texto\nRevisa la lista de lenguajes soportados [entrando aquí](https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/#api-overview__languages)',
      usage: prefix => `\`${prefix}translate <lenguajeAtraducir> <texto>\``,
      examples: prefix => `\`${prefix}translate en Hola soy hermoso\``,
      enabled: true,
      cooldown: 4,
      aliases: ['ts'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: `noargs necesitas especificar un idioma y un texto a traducir\nUsa \`${message.prefix}h ts\` para ver todas las opciones de traducciones`, usage: this.help.usage(message.prefix), message }));
      else {
        if (!args[1]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs falta el texto a traducir', usage: this.help.usage(message.prefix), message }));
        else {
          let msg = await message.channel.send(client.fns.reply('generating', message));
          require('yandex-translate-api')(client.config.yandexAPIkey).translate(args.slice(1).join(' '), { to: args[0] }, (err, res) => {
            if (err) msg.edit(client.message({ emoji: 'red', razón: 'ocurrió un error intentando traducir', usage: this.help.usage(message.prefix), message }));
            else if (args.slice(1).join(' ').length > 900) msg.edit(client.message({ emoji: 'red', razón: 'el texto traducido no puede exceder los 900 carácteres', usage: this.help.usage(message.prefix), message }));
            else {
              embed
                .setColor(client.fns.selectColor('lightcolors'))
                .setTitle('🗣 Traductor')
                .addField('Texto original', args.slice(1).join(' '))
                .addField('Texto traducido', res.text);
              message.channel.send({ embed });
            }
          });
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
