module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'botsuggestion',
      description: 'Envía tu sugerencia directa al servidor de soporte para mejorar el bot',
      usage: prefix => `\`${prefix}botsuggestion <sugerencia>\``,
      examples: prefix => `\`${prefix}botsuggestion Agregar un comando para vetar a todos los usuarios de un servidor\``,
      enabled: true,
      cooldown: 30,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs debes escribir tu sugerencia', usage: this.help.usage(message.prefix), message }));
      else {
        message.channel.send(client.message({ emoji: 'gray', razón: '¿seguro que quieres mandar ésta sugerencia?', usage: this.help.usage(message.prefix), message }))
        let i = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, errors: ['cancelar'] });
        i = await i.first();
        if (i.content.toLowerCase().includes('sí') || i.content.toLowerCase().includes('si')) {
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setAuthor(`${message.author.tag} envió una sugerencia`, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
            .setFooter(`Sugerencia envíada desde ${message.guild.name}`, message.guild.iconURL());
          let msg = await client.channels.cache.get('669009316191404037').send({ embed });
          msg.react('487031865577046026');
          msg.react('487031865165873172');
          message.channel.send(client.message({ emoji: 'green', razón: 'sugerencia enviada correctamente', message }));
        } else if (i.content.toLowerCase().includes('no')) {
          message.channel.send(client.message({ emoji: 'gray', razón: 'está bien, cancelando operación', message }));
        } else {
          message.channel.send(client.message({ emoji: 'green', razón: 'respuesta incorrecta, cancelando operación', message }));
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
