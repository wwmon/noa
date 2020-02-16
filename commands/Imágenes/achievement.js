module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'achievement',
      description: '¡Escribe cualquier logro que quisieras tener en Xbox!',
      usage: prefix => `\`${prefix}achievement <texto>\``,
      examples: prefix => `\`${prefix}achievement Utilizar ${require('../../config').bot} durante por un mes\``,
      enabled: true,
      aliases: ['logro'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs agrega el logro que quieres obtener', usage: this.help.usage(message.prefix), message }));
      else {
        let msg = await message.channel.send(client.fns.reply('generating', message)),
          img = await client.weez.logro(args.join(' '));
        msg.delete();
        message.channel.send({ files: [img] });
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
