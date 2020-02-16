module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'seenon',
      description: 'Listado de servidores compartidos con ' + require('../../config').bot,
      usage: prefix => `\`${prefix}seenon [@usuario]\``,
      examples: prefix => `\`${prefix}seenon @Oso#4922\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['sharedservers', 'seenon'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas mencionar a un usuario', usage: this.help.usage(message.prefix), message }));
      else {
        if (!isNaN(args[0])) {
          try {
            return await send(await client.users.fetch(args[0]));
          } catch {
            return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenece a ningún usuario', usage: this.help.usage(message.prefix), message }));
          }
        }
        if (message.mentions.users.size > 0) return await send(message.mentions.users.first());
        let u = message.guild.members.cache.array().filter(x => `${x.user.tag}||${x.displayName}`.toLowerCase().includes(args[0].toLowerCase()));
        if (u.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay usuarios que coincidan con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        else if (u.length === 1) return await send(u[0].user);
        else if (u.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos usuarios coinciden con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        else {
          let m = 'Selecciona un número entre 1 y ' + u.length + '```';
          for (let x = 0; x < u.length; x++) {
            m += `${x + 1} ~ ${u[x].nickname ? `${u[x].displayName} (${u[x].user.tag})` : `${u[x].user.tag}`}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content < u.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', usage: this.help.usage(message.prefix), message }));
            msg.delete({ timeout: 5000 });
          } else {
            await send(u[i.content - 1].user);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(user) {
        let searching = client.guilds.cache
          .filter(g => g.members.cache.has(user.id))
          .map(g => `\`${g.name}\``)
          .join(`,\n`);
        embed
          .setAuthor(`Servidores en común de ${user.tag}`, user.displayAvatarURL())
          .setDescription(`\n\n${searching.length > 2048 ? searching.slice(0, 2000) + '\n...' : searching}`)
          .setColor(client.fns.selectColor('lightcolors'))
          .setFooter(`Un total de ${client.guilds.cache.filter(g => g.members.cache.has(user.id)).size} servidores`);
        message.channel.send({ embed });
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
