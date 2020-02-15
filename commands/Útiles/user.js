module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'user',
      description: 'Revisa la información de un usuario.> **Parámetros:**\n• `--random`: Obtén un miembro del servidor al azar',
      usage: prefix => `\`${prefix}user [usuario | opcion]\``,
      examples: prefix => `\`${prefix}user @Tok#3934\n${prefix}user --random\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['whois', 'userinfo', 'u'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) await send(message.author);
      else if (args[0].toLowerCase() === '--random') {
        let random = message.guild.members.cache.random(),
          color = random.displayHexColor;
        if (color === '#000000') color = client.fns.selectColor('lightcolors');
        embed.setColor(color).setDescription(`El usuario afortunado es: ${random.toString()}`);
        message.channel.send({ embed });
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
      async function send(user) {
        let colorEmbed = { online: client.fns.selectColor('green'), idle: client.fns.selectColor('yellow'), dnd: client.fns.selectColor('red'), offline: client.fns.selectColor('lightcolors') },
          status = { online: 'Online <:online:597588160104366080>', idle: 'Ausente <:idle:597588160175931442>', dnd: 'No molestar <:dnd:597588160163348480>', offline: 'Offline <:offline:597588160561807396>', streaming: 'Transmitiendo <:streaming:597588160557613067>' };

        let member = message.guild.member(user),
          days = client.fns.checkDays(user.createdAt),
          ca = user.createdAt.toDateString().split(' '),
          ja = member.joinedAt.toDateString().split(' '),
          roles = member.roles.cache
            .filter(r => r.name != '@everyone')
            .map(r => r.toString())
            .join(' | ');
        if (roles.length >= 1000) roles = `La cantidad de roles es muy extensa, por lo tanto su cifra exacta es: ${member.roles.size}`;
        let activities = user.presence.activities[0];
        embed
          .setThumbnail(user.displayAvatarURL())
          .setColor(colorEmbed[user.presence.status])
          .setAuthor(`${user.tag}`, user.displayAvatarURL())
          .addField('Identificación', `• Nombre y discriminador: ${user.tag}\n• ID: ${user.id}\n• Apodo: ${member.displayName}`)
          .addField('Cuenta', `• Creada el: ${ca[2]}/${ca[1]}/${ca[3]} (Hace ${days})\n• Ingreso al servidor: ${ja[2]}/${ja[1]}/${ja[3]} (Hace ${client.fns.checkDays(member.joinedAt)})\n• Servidores en común: ${client.guilds.cache.filter(g => g.members.cache.has(user.id)).size}`)
          //.addField('Actividad', `• Jugando a: ${activities.name}\n• Estado: ${activities.toString()}`)
          .addField('Actividad', `• Jugando a: ${activities ? activities.name : 'Nada'}\n• Estado: ${status[user.presence.status]}`)
          .addField('Roles', `• Rol destacado: ${member.roles.highest}\n• Listado de roles:\n${roles}\n`);
        //.addField(`Permisos de usuario`, `\`\`\`${member.permissions.toArray(r => r).join(',\n')}\`\`\``)
        //.addField('Servidores en común', `${client.guilds.cache.filter(g => g.members.cache.has(info.id)).map(g => `\`${g.name}\``).join(`, `)}`)
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
