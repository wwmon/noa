module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'blacklist',
      description: 'Agrega o remueve a un usuario de la lista negra del bot',
      usage: prefix => `\`${prefix}blacklist <add | remove> <id> [razón]\``,
      examples: prefix => `\`${prefix}blacklist add 532818617457311744 Mal uso de comandos para soporte\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 1,
      aliases: ['bl'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let opciones = ['add', 'remove'];
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs', message }, this.help.usage(message.prefix)) + '\nOpciones: `' + opciones.join('`, `') + '`');
      else if (args[0].toLowerCase() === opciones[0]) {
        if (!args[1]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas proporcionar la ID de algún usuario', usage: this.help.usage(message.prefix), message }));
        else {
          let user = await client.users.fetch(args[1]);
          if (!user) message.channel.send(client.message({ emoji: 'red', razón: 'ese no es un usuario válido', usage: this.help.usage(message.prefix), message }));
          else {
            let u = await client.findOrCreateUser({ id: args[1] });
            u.blacklist = {
              bl: true,
              blreason: args[2] ? args.slice(2).join(' ') : 'Sin razón'
            };
            u.save();
            message.channel.send(client.message({ emoji: 'green', razón: 'se ha agregado correctamente a ' + user.tag + ' a la lista negra del bot' + (args[2] ? '\nPor la razón: ' + args.slice(2).join(' ') : ''), usage: this.help.usage(message.prefix), message }))
          }
        }
      } else if (args[0].toLowerCase() === opciones[1]) {
        if (!args[1]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas propocionar la ID de algún usuario', usage: this.help.usage(message.prefix), message }));
        else {
          let user = await client.users.fetch(args[1]);
          if (!user) message.channel.send(client.message({ emoji: 'red', razón: 'ese no es un usuario válido', usage: this.help.usage(message.prefix), message }));
          else {
            let u = await client.findOrCreateUser({ id: args[1] });
            u.blacklist = {
              bl: false,
              blreason: 'Sin razón'
            };
            u.save();
            message.channel.send(client.message({ emoji: 'green', razón: 'se ha removido correctamente a ' + user.tag + ' de la lista negra del bot', usage: this.help.usage(message.prefix), message }));
          }
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
