module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pixelate',
      description: 'Genera un filtro de imagen que vuelve pixelado un avatar',
      usage: (prefix) => `\`${prefix + this.help.name} [@usuario|+imagen]\``,
      examples: (prefix) => `\`${prefix}pixelate\``,
      enabled: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let url;
      if (!args[0]) {
        if (message.attachments.first()) url = message.attachments.first().url;
        else url = message.author.displayAvatarURL({ format: 'png', size: 2048 });
      } else {
        if (!isNaN(args[0])) {
          try {
            let user = await client.users.fetch(args[0]);
            url = user.displayAvatarURL({ format: 'png', size: 2048 });
          } catch {
            return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenece a nadie', usage: this.help.usage(message.prefix), message }));
          }
        } else {
          if (message.mentions.users.size > 0) {
            url = message.mentions.users.first().displayAvatarURL({ format: 'png', size: 2048 });
          } else {
            let u = message.guild.members.cache.array().filter((x) => `${x.user.tag}||${x.displayName}`.toLowerCase().includes(args[0].toLowerCase()));
            if (u.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay usuarios que coincidan con tu búsqueda, intenta ser más específico', message }));
            else if (u.length === 1) url = u[0].user.displayAvatarURL({ format: 'png', size: 2048 });
            else if (u.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos usuarios coinciden con tu búsqueda, intenta ser más específico', message }));
            else {
              let m = 'Selecciona un número entre 1 y ' + u.length + '```';
              for (let x = 0; x < u.length; x++) {
                m += `${x + 1} ~ ${u[x].nickname ? `${u[x].displayName} (${u[x].user.tag})` : `${u[x].user.tag}`}\n`;
              }
              let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
                i = await message.channel.awaitMessages((m) => m.author.id === message.author.id && m.content > 0 && m.content < u.length + 1, { max: 1, time: 30000 });
              i = await i.first();
              if (!i) {
                message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', message }));
                msg.delete({ timeout: 5000 });
              } else {
                url = u[i.content - 1].user.displayAvatarURL({ format: 'png', size: 2048 });
                msg.delete({ timeout: 5000 });
              }
            }
          }
        }
      }
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/pixelate?url=${url}`);
      msg.delete();
      message.channel.send(new (require('discord.js').MessageAttachment)(img.raw));
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
