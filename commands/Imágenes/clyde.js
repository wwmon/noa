module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'clyde',
      description: 'Genera una imagen donde clyde escribe un mensaje',
      usage: prefix => `\`${prefix}clyde <texto>\``,
      examples: prefix => `\`${prefix}clyde\``,
      enabled: true,
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
      if (!args[0] || args.join(' ').length < 3) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs ingresa el texto para que lo repita Clyde', usage: this.help.usage(message.prefix), message }));
      else if (args.join(' ').length > 70) message.channel.send(client.fns.message({ emoji: 'red', razón: 'el texto no puede exceder los 70 carácters', message }));
      else {
        let img = await require('node-superfetch').get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(' ')}`),
          msg = await message.channel.send(client.fns.reply('generating', message));
        msg.delete();
        message.channel.send({ files: [img.body.message] });
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
