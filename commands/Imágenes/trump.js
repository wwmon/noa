module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'trump',
      description: 'Genera una imagen donde Donald Trump establece una ley',
      usage: (prefix) => `\`${prefix + this.help.name} <texto>\``,
      examples: (prefix) => `\`${prefix}trump Tercera guerra mundial\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
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
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe la nueva ley', usage: this.help.usage(message.prefix), message }));
      else if (texto.length > 150) message.channel.send({ emoji: 'red', razón: 'el texto no debe exceder los 150 caracteres', message });
      else {
        if (message.mentions.users.first()) message.mentions.users.array().forEach((x) => (texto = texto.replace(`<@!${x.id}>` || `<@${x.id}>`, `@${x.username}`)));
        if (message.mentions.roles.first()) message.mentions.roles.array().forEach((x) => (texto = texto.replace(`<@&${x.id}>`, `@${x.name}`)));
        if (message.mentions.channels.first()) message.mentions.channels.array().forEach((x) => (texto = texto.replace(`<#${x.id}>`, `#${x.name}`)));
        if (texto.includes('#')) texto = texto.replace('#', '%23');
        if (texto.includes('&')) texto = texto.replace('&', '%26');
        let msg = await message.channel.send(client.fns.reply('generating', message)),
          img = await client.weez.trump(texto);
        msg.delete();
        message.channel.send({ files: [img] });
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
