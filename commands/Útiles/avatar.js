module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: 'Mira con mejor belleza el avatar de un usuario, e incluso el tuyo!\n> **Parámetros:**\n• `--server` , `--servidor`: Muestra el ícono del servidor\n• `--random`: Muestra el un avatar aleatorio',
      usage: prefix => `\`${prefix}avatar [usuario | server]\``,
      examples: prefix => `\`${prefix}avatar server\n${prefix}avatar Luna\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['picture', 'pfp', 'av', 'ineedtostealanavatar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) return await send(message.author);
      else if (args[0].toLowerCase() === ('--server' || '--servidor')) {
        if (message.guild.iconURL() === null) return message.channel.send(client.message({ emoji: 'red', razón: 'este servidor no cuenta con un ícono personalizado', message }));
        else {
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setTitle('Ícono del servidor')
            .setURL(message.guild.iconURL({ size: 2048, dynamic: true }))
            .setImage(message.guild.iconURL({ size: 2048, dynamic: true }));
          message.channel.send({ embed });
          return;
        }
      } else if (args[0].toLowerCase() === '--random') {
        let random = message.guild.members.cache.random().user;
        return await send(random);
      } else {
        if (!isNaN(args[0])) {
          try {
            return await send(await client.users.fetch(args[0]));
          } catch {
            return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenece a nadie', usage: this.help.usage(message.prefix), message }));
          }
        }
        if (message.mentions.users.size > 0) return await send(message.mentions.users.first());
        let u = message.guild.members.cache.array().filter(x => `${x.user.tag}||${x.displayName}`.toLowerCase().includes(args[0].toLowerCase()));
        if (u.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay usuarios que coincidan con tu búsqueda, intenta ser más específico', message }));
        else if (u.length === 1) return await send(u[0].user);
        else if (u.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos usuarios coinciden con tu búsqueda, intenta ser más específico', message }));
        else {
          let m = 'Selecciona un número entre 1 y ' + u.length + '```';
          for (let x = 0; x < u.length; x++) {
            m += `${x + 1} ~ ${u[x].nickname ? `${u[x].displayName} (${u[x].user.tag})` : `${u[x].user.tag}`}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content < u.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', message }));
            msg.delete({ timeout: 5000 });
          } else {
            await send(u[i.content - 1].user);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(user) {
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setTitle('Avatar de ' + user.tag)
          .setURL(user.displayAvatarURL({ size: 2048, dynamic: true }))
          .setDescription('[Búscalo en Google](https://www.google.com/searchbyimage?image_url=' + user.displayAvatarURL({ size: 2048 }) + ')')
          .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }));
        return message.channel.send({ embed });
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
