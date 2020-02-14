module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'trump',
      description: 'Genera una imagen donde Donald Trump establece una ley',
      usage: prefix => `\`${prefix}trump <texto>\``,
      examples: prefix => `\`${prefix}trump Tercera guerra mundial.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe la nueva ley', usage: this.help.usage(message.prefix), message }));
      else if (args.join(' ').length > 150) message.channel.send({ emoji: 'red', razón: 'el texto no debe rebasar los 150 caracteres', message });
      else {
        let msg = await message.channel.send(client.fns.reply('generating', message)),
          img = await client.weez.trump(args.join(' '));
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
