module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'ban',
      description: 'Veta a algún usuario del servidor',
      usage: prefix => `\`${prefix}\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      cooldown: 3,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
      } else {
        if (!isNaN(args[0])) {
          try {
            return await send(await client.users.fetch(args[0]));
          } catch {
            return message.channel.send('Esa id no pertenece a ningún usuario');
          }
        }
        if (message.mentions.users.size > 0) return await send(message.mentions.users.first());
        let u = message.guild.members.cache.array().filter(x => `${x.user.tag}||${x.displayName}`.toLowerCase().includes(args[0].toLowerCase()));
        if (u.length <= 0) return message.channel.send('No hay usuarios que coincidan con tu búsqueda, intenta ser más específico');
        else if (u.length === 1) return await send(u[0].user);
        else if (u.length > 10) return message.channel.send('Muchos usuarios coinciden con tu búsqueda, intenta ser más específico');
        else {
          let m = 'Selecciona un número entre 1 y ' + u.length + '```';
          for (let x = 0; x < u.length; x++) {
            m += `${x + 1} ~ ${u[x].nickname ? `${u[x].displayName} (${u[x].user.tag})` : `${u[x].user.tag}`}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content < u.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send('Cancelando, no se recibió respuesta');
            msg.delete({ timeout: 5000 });
          } else {
            await send(u[i.content - 1].user);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(user) {}
    } catch (e) {
      message.channel.send(message.error(e));
      client.err({
        type: 'command',
        name: this.help.name,
        error: e
      });
    }
  }
};
