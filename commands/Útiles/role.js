module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'role',
      description: 'Proporciona la información sobre un rol\n> **Parámetros:**\n• `--lista`, `--list`: Muestra la lista de roles en el servidor',
      usage: prefix => `\`${prefix}role <@rol>\``,
      examples: prefix => `\`${prefix}role Dueños\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['rl'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs', usage: this.help.usage(message.prefix), message }));
      else if (args[0].toLowerCase() === '--lista' || args[0].toLowerCase() === '--list') {
        embed.setColor(client.fns.selectColor('lightcolors'));
        if (message.guild.roles.cache.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'este servidor no tiene roles creados', usage: this.help.usage(message.prefix), message }));
        let roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter(r => r.id !== message.guild.roles.cache.everyone.id)
            .map(r => `• ${r.name}`),
          rolesSize = message.guild.roles.cache.size - 1,
          page = parseInt(args[1]),
          pages = Math.ceil(rolesSize / 20) === 0 ? 1 : Math.ceil(rolesSize / 20);
        if (page > pages) return message.channel.send(client.message({ emoji: 'red', razón: 'esa página no existe', usage: this.help.usage(message.prefix), message }));
        if (!page || page === 1) page = 0;
        embed
          .setAuthor(`Listado de roles en ${message.guild.name}`, message.guild.iconURL())
          .setFooter(`Página ${page === 0 ? page + 1 : page} de ${pages}`)
          .setTitle(`Este servidor cuenta con ${message.guild.roles.cache.size} roles`)
          .setDescription(`${roles.slice(page === 0 ? 0 : (page - 1) * 20, page === 0 && rolesSize > 20 ? 20 : (page + 1) * 20).join('\n')}`);
        message.channel.send({ embed });
      } else {
        if (!isNaN(args[0])) {
          try {
            return await send(message.guild.roles.cache.get(args[0]));
          } catch {
            return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenecea ningún rol (o no en este servidor)', usage: this.help.usage(message.prefix), message }));
          }
        }
        if (message.mentions.roles.size > 0) return await send(message.mentions.roles.first());
        let r = message.guild.roles.cache.array().filter(x => `${x.name}`.toLowerCase().includes(args[0].toLowerCase()));
        if (r.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay roles que coincidan con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        else if (r.length === 1) return await send(r[0]);
        else if (r.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'hay muchos roles que coinciden con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        else {
          let m = 'Selecciona un número entre 1 y ' + r.length + '```';
          for (let x = 0; x < r.length; x++) {
            m += `${x + 1} ~ ${r[x].name}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content < r.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', usage: this.help.usage(message.prefix), message }));
            msg.delete({ timeout: 5000 });
          } else {
            await send(r[i.content - 1]);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(role) {
        let createdAtRaw = role.createdAt.toDateString(),
          createdAt = createdAtRaw.split(' ');
        embed
          .setColor(role.color)
          .addField('Nombre', `${role.toString()} \`[${role.name}]\``)
          .addField('ID', role.id, true)
          .addField('Usuarios con el rol', role.members.cache.size, true)
          .addField('Posición', role.position, true)
          .addField('Color', role.hexColor, true)
          .addField('Separado', role.hoist ? 'Sí' : 'No', true)
          .addField('Mencionable', role.mentionable ? 'Sí' : 'No', true)
          .addField('Creado el', `${createdAt[2]}/${createdAt[1]}/${createdAt[3]} (Hace ${client.fns.checkDays(role.createdAt)})`);
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
