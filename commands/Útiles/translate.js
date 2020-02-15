module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'translate',
      description: 'Traduce un texto. Revisa la lista de lenguajes soportados [entrando aquí.](https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/#api-overview__languages)',
      usage: prefix => `\`${prefix}translate <lenguajeAtraducir> <texto>\``,
      examples: prefix => `\`${prefix}translate en Hola soy hermoso.\``,
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
      if (!args[0]) return message.channel.send('Necesitas ingresar el idioma al cual se traducirá tu mensaje. Utiliza `' + message.prefix + 'help translate` para ver las opciones de traducción posibles');
      if (!args[1]) return message.channel.send('Falta el texto a traducir');
      let msg = await message.channel.send(client.fns.reply('generating', message));
      require('yandex-translate-api')(client.config.yandexAPIkey).translate(args.slice(1).join(' '), { to: args[0] }, (err, res) => {
        if (err) return msg.edit(`Ocurrió un error al tratar de traducir el mensaje, error: ${err}`);
        if (args.slice(1).join(' ').length > 900) return msg.edit(`El texto a traducir no debe ser mayor a 900 caracteres`);
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setTitle('🗣 Traductor')
          .addField('Texto original', args.slice(1).join(' '))
          .addField('Texto traducido', res.text);
        message.channel.send({ embed });
      });
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
