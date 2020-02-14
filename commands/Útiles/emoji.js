module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'emoji',
      description: 'Muestra la información de un emoji seleccionado.\n> **Opciones de usuario:**\n• `<emoji> --info`: Muestra toda la información relacionada con el emoji.\n\n> **Opciones de administración:**\n• `add <nombre> <imagen>`: Agrega un emoji al servidor donde lo utilizas sin necesidad de acceder a la configuración del servidor.\n• `remove <emoji>`: Elimina un emoji del servidor donde se utiliza, sin necesidad de acceder a la configuración del servidor.\n• `rename <emoji> <nuevoNombre>`: Cambia el nombre de un emoji del servidor donde se utiliza, sin necesidad de acceder a la configuración del servidor',
      usage: prefix => `\`${prefix}emoji <add | remove | --lista | emoji [--info]>\``,
      examples: prefix => `${prefix}emoji <:gaphy:531318269190078505> --info\n${prefix}emoji remove <:DBL:489519574698426369>`,
      enabled: true,
      guildOnly: true,
      cooldown: 5,
      aliases: ['emote', 'e'],
      botPermissions: ['MANAGE_EMOJIS'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed.setColor(client.fns.selectColor('lightcolors'));
      let emoji = /((:|<:|<a:)((\w{1,64}:\d{17,18})|(\w{1,64}))(:|>))|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.exec(args.join(' '));
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas proporcionar alguna opción', usage: this.help.usage(message.prefix), message }));
      else if (args[0].toLowerCase() === '--lista' || args[0].toLowerCase() === '--list') {
        embed.setTitle('Emotes del servidor');
        let nitro = message.guild.emojis.cache.filter(e => e.animated === true),
          classic = message.guild.emojis.cache.filter(e => e.animated === false);
        if (classic.size > 0) {
          embed.setColor(client.fns.selectColor('lightcolors')).setTitle('Emote' + (classic.size > 1 ? 's' : '') + ' clásico' + (classic.size > 1 ? 's' : '') + ' [' + classic.size + ']');
          classic = classic.array();
          for (let i = 0; i < classic.length; i += 10) {
            embed.addField(
              'Clásicos...',
              classic
                .slice(i, i + 10)
                .map(x => x.toString())
                .join(' | ')
            );
          }
          message.channel.send({ embed: embed });
        }
        if (nitro.size > 0) {
          let embedd = new (require('discord.js').MessageEmbed)();
          embedd.setColor(client.fns.selectColor('lightcolors')).setTitle('Emote' + (nitro.size > 1 ? 's' : '') + ' nitro [' + nitro.size + ']');
          nitro = nitro.array();
          for (let i = 0; i < nitro.length; i += 10) {
            embedd.addField(
              'Nitro...',
              nitro
                .slice(i, i + 10)
                .map(x => x.toString())
                .join(' | ')
            );
          }
          message.channel.send({ embed: embedd });
        }
      } else if (args[0].toLowerCase() === 'add' || args[0].toLowerCase() === 'agregar') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else {
          if (!args[1]) message.channel.send('Necesitas elegir el nombre para el emoji a agregar');
          else {
            let create;
            try {
              create = await message.guild.emojis.cache.create(message.attachments.first() ? message.attachments.first().url : args[2] ? args[2] : 'awawa', args[1], `Acción cometida desde un comando por: ${message.author.tag}`);
            } catch {
              return message.channel.send(client.message({ emoji: 'red', razón: 'parece que no pusiste bien la imagen o ya no hay más espacio para emojis', message }));
            }
            message.channel.send(`El emote \`:${args[1]}:\` fue agregado correctamente ${create.toString()}`);
          }
        }
        return;
      } else if (args[0].toLowerCase() === 'remove' || args[0].toLowerCase() === 'remover') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else {
          if (!args[1]) message.channel.send('Necesitas especificar un emoji para borrar');
          let emoji1 = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(x => x.name.includes(args[1])) || message.guild.emojis.cache.find(x => x.toString() === args[1]);
          if (!emoji1) message.channel.send('Emoji no encontrado');
          else {
            let msg = await message.channel.send('¿Seguro que quieres borrar el emoji `:' + emoji1.name + ':` ' + emoji1.toString() + '?\n*¡Esta acción es irrevesible!, tienes 30 segundos para decidir con `si` o `no`.*'),
              index = await message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000
              });
            index = index.first();
            if (!index) message.channel.send('No se recibió respuesta, cancelando acción');
            else {
              if (index.content.toLowerCase().startsWith('sí') || index.content.toLowerCase().startsWith('si') || index.content.toLowerCase().startsWith('yes') || index.content.toLowerCase().startsWith('confirmo')) {
                try {
                  emoji1.delete(`Acción cometida desde un comando por: ${message.author.tag}`);
                  message.channel.send('Emoji eliminado correctamente');
                } catch {
                  return message.channel.send('Ha ocurrido un error borrando el emoji');
                }
              } else if (index.content.toLowerCase().startsWith('no') || index.content.toLowerCase().startsWith('nope') || index.content.toLowerCase().startsWith('desconfirmo')) {
                message.channel.send('Está bien, cancelando acción');
              } else {
                message.channel.send('Respuesta incorrecta. Solo admito "sí" y "no". Cancelando acción');
              }
            }
          }
        }
        return;
      } else if (args[0].toLowerCase() === 'rename' || args[0].toLowerCase() === 'renombrar') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else {
          if (!args[1]) return message.channel.send('Necesitas especificar un emoji para renombrar');
          let emoji1 = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(x => x.name.includes(args[1])) || message.guild.emojis.cache.find(x => x.toString() === args[1]);
          if (!emoji1) message.channel.send('Emoji no encontrado');
          else {
            if (!args[2]) message.channel.send('Necesitas especificar un nuevo nombre para el emoji');
            else {
              try {
                emoji1.edit({ name: args[2], reason: `Acción cometida desde un comando por: ${message.author.tag}` });
                message.channel.send('He cambiado correctamente el nombre del emoji, ahora será `:' + args[2] + ':` ' + emoji1.toString());
              } catch {
                return message.channel.send('Ha ocurrido un error intentando cambiar el nombre');
              }
            }
          }
        }
        return;
      } else {
        if (!emoji) message.channel.send('Emoji no encontrado');
        else {
          if (args.pop() === '--info') {
            let emo = emoji[3].split(':');
            let uwu = client.emojis.cache.get(emo[1]);
            if (!uwu) message.channel.send('Emoji no encontrado');
            else {
              message.channel.send(
                `• Nombre: ${uwu.name}\n• ID: ${uwu.id}\n• Vista previa: ${uwu.toString()}\n• Creado el: ${require('moment')
                  .utc(emoji.createdAt)
                  .format('DD/MM/YYYY, h:mm A')}`
              );
            }
          } else {
            if (!emoji[0].includes('<' || '>')) message.channel.send('El emoji seleccionado es un emoji "default", no puedo hacerlo jumbo');
            else {
              let emo = emoji[3].split(':');
              message.channel.send(new (require('discord.js').MessageAttachment)(`https://cdn.discordapp.com/emojis/${emo[1]}.${emoji[2].includes('a') ? 'gif' : 'png'}`));
            }
          }
        }
        return;
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
