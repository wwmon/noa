module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'clear',
      description: 'Borra varios mensajes en una sola tanda.\n\n> **NOTA:**\nSolo puedes eliminar un máximo de `100` mensajes a la vez, y un mínimo de `2`',
      usage: prefix => `\`${prefix}clear <cantidadMsg>\``,
      examples: prefix => `\`${prefix}clear 56\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: ['purge', 'prune'],
      botPermissions: ['MANAGE_MESSAGES'],
      memberPermissions: ['MANAGE_MESSAGES'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      var deletedMessages = -1;
      let messageCount = parseInt(args);
      let perms = message.member.hasPermission('MANAGE_MESSAGES');

      if (!perms) return message.channel.send(client.fns.noPerm(message));
      if (!args[0]) return message.channel.send(`Debes agregar la cantidad de mensajes que serán borrados`);
      if (messageCount < 2 || messageCount > 100) return message.channel.send(`El número de mensajes a borrar debe ser entre \`2\` y \`100\``);
      if (messageCount >= 2 && messageCount <= 100) {
        message.channel.messages
          .fetch({ limit: messageCount })
          .then(messages => message.channel.bulkDelete(messages))
          .then(m => {
            m.channel.send('Se borraron ' + args[0] + ' mensajes correctamente').then(m => m.delete(1000000));
          });
        //if (deletedMessages === -1) deletedMessages = 0;
      }
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
