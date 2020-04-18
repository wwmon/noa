module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'clyde',
      description: 'Genera una imagen donde clyde escribe un mensaje',
      usage: (prefix) => `\`${prefix + this.help.name} [@usuario|+imagen]\``,
      examples: (prefix) => `\`${prefix}clyde BRO MOMENTO\``,
      enabled: true,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let texto = args.join(' ');
      if (!args[0] || texto.length < 3) message.channel.send(client.message({ emoji: 'red', razón: 'noargs ingresa el texto para que lo repita Clyde', usage: this.help.usage(message.prefix), message }));
      else if (texto.length > 70) message.channel.send(client.message({ emoji: 'red', razón: 'el texto no puede exceder los 70 carácters', message }));
      else {
        if (message.mentions.users.first()) message.mentions.users.array().forEach((x) => (texto = texto.replace(`<@!${x.id}>` || `<@${x.id}>`, `@${x.username}`)));
        if (message.mentions.roles.first()) message.mentions.roles.array().forEach((x) => (texto = texto.replace(`<@&${x.id}>`, `@${x.name}`)));
        if (message.mentions.channels.first()) message.mentions.channels.array().forEach((x) => (texto = texto.replace(`<#${x.id}>`, `#${x.name}`)));
        if (texto.includes('#')) texto = texto.replace('#', '%23');
        if (texto.includes('&')) texto = texto.replace('&', '%26');
        let img = await require('node-superfetch').get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${texto}`),
          msg = await message.channel.send(client.fns.reply('generating', message));
        msg.delete();
        message.channel.send({ files: [img.body.message] });
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message,
      });
    }
  }
};
