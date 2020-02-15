module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'channel',
      description: 'Muestra la información sobre algún canal.\n> **Parámetros:**\n• `--lista`, `--list`: Mira la lista de los canales del servidor',
      usage: prefix => `\`${prefix}channel [canal]\``,
      examples: prefix => `\`${prefix}channel reglas\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['ch'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) return await send(message.channel);
      else if (args[0].toLowerCase() === '--lista' || args[0].toLowerCase() === '--list') {
        let img_texto = '[💬]',
          img_categoria = '[🗂]',
          img_voz = '[🔊]',
          texto = '',
          no_categorias = [],
          categorias = [];
        message.guild.channels.cache
          .filter(x => x.type === 'category')
          .array()
          .map(c => categorias.push({ nombre: c.name, parseID: c.id, posicion: c.position, canales: [] }));
        message.guild.channels.cache
          .filter(x => x.type !== 'category')
          .array()
          .map(c => {
            if (c.parent) {
              let index = categorias.findIndex(h => h.parseID === c.parent.id);
              if (index !== -1) categorias[index].canales.push({ nombre: c.name, posicion: c.position, tipo: c.type });
              return;
            }
            no_categorias.push({ nombre: c.name, posicion: c.position, tipo: c.type });
          });
        no_categorias.sort(Ordenar);
        for (var canal of no_categorias) texto += canal.tipo == 'text' ? `${img_texto} ${canal.nombre}\n` : `${img_voz} ${canal.nombre}\n`;
        if (categorias.length > 0) {
          categorias.sort(Ordenar);
          for (var categoria of categorias) {
            texto += `${img_categoria} ${categoria.nombre}\n`;
            categoria.canales.sort(Ordenar);
            for (var canal of categoria.canales) texto += canal.tipo == 'text' ? `    ${img_texto} ${canal.nombre}\n` : `    ${img_voz} ${canal.nombre}\n`;
          }
        }
        if (texto.length >= 2049) return message.channel.send('Este servidor tiene muchos canales y supera mis límites. El comando no puede ser ejecutado');
        embed
          .setColor('#9C9C9C')
          .setAuthor(`Listado de canales en ${message.guild.name}`, message.guild.iconURL({ format: 'jpg', size: 2048 }))
          .setTitle(`Se encontraron ${message.guild.channels.cache.size} canales en este servidor`)
          .setDescription(texto.length > 2048 ? texto.slice(0, 2000) + '\n...' : texto.length > 0 ? '```' + texto + '```' : 'No datos')
          .setThumbnail(message.guild.iconURL({ format: 'jpg', size: 2048 }));
        message.channel.send({ embed });
      } else {
        if (!isNaN(args[0])) {
          try {
            return await send(message.guild.channels.cache.get(args[0]));
          } catch {
            return message.channel.send('Esa id no pertenece a ningún canal. (O al menos no de este servidor)');
          }
        }
        if (message.mentions.channels.size > 0) return await send(message.mentions.channels.first());
        let c = message.guild.channels.cache.array().filter(x => x.type !== 'category' && `${x.name}`.toLowerCase().includes(args[0].toLowerCase()));
        if (c.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay canales coinciden con tu búsqueda, intenta ser más específico', message }));
        else if (c.length === 1) return await send(c[0]);
        else if (c.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos canales coinciden con tu búsqueda, intenta ser más específico', message }));
        else {
          let m = 'Selecciona un número entre 1 y ' + c.length + '```';
          for (let x = 0; x < c.length; x++) {
            m += `${x + 1} ~ ${c[x].name}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content < c.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', message }));
            msg.delete({ timeout: 5000 });
          } else {
            await send(c[i.content - 1]);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(channel) {
        let type = { text: 'Texto', voice: 'Voz', category: 'Categoría', dm: 'Mensajes privados', group: 'Grupo privado', news: 'Noticias', store: 'Tienda' },
          cr = channel.createdAt.toDateString(),
          cra = cr.split(/ +/g);
        if (channel.type === 'text') {
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setTitle('Información de ' + channel.name)
            .addField('Principal', `• ID: ${channel.id}\n• Tipo: Texto\n• Tópico: ${channel.topic ? (channel.topic.length > 250 ? 'Muy larga' : channel.topic) : 'Sin descripción'}`)
            .addField('Más...', `• Posición: ${channel.rawPosition}\n• Creado el: ${cra[2]}/${cra[1]}/${cra[3]} (Hace ${client.fns.checkDays(channel.createdAt)})`);
          message.channel.send({ embed });
        } else {
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setTitle('Información de ' + channel.name)
            .addField('Principal', `• ID: ${channel.id}\n• Tipo: ${type[channel.type]}`)
            .addField('Más...', `• Posición: ${channel.rawPosition}\n• Creado el: ${cra[2]}/${cra[1]}/${cra[3]} (Hace ${client.fns.checkDays(channel.createdAt)})`);
          message.channel.send({ embed });
        }
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
function Ordenar(canal1, canal2) {
  if (canal2.tipo == 'voice' && canal1.tipo != 'voice') return -1;
  return canal1.tipo != 'voice' || canal2.tipo == 'voice' ? canal1.posicion - canal2.posicion : 1;
}
