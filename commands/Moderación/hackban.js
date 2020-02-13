module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'hackban',
      description: 'Banea a un usuario por ID',
      usage: prefix => `\`${prefix}hackban <id>\``,
      examples: prefix => `\`${prefix}hackban 431447823616180225\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: ['BAN_MEMBERS'],
      memberPermissions: ['BAN_MEMBERS'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(client.fns.noPerm(message));

      if (!args[0]) return message.channel.send('Por favor provee una ID para banear a un usuario');
      let bannedMember = await client.users.fetch(args[0]);
      if (!bannedMember) return message.channel.send(`Por favor ingresa la ID de un usuario para banear`);

      let reason = args.slice(1).join(' ');
      if (!reason) reason = 'No especificada';

      if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`No tengo permisos para ejecutar este comando`);

      try {
        message.guild.members.cache.ban({ days: 0, reason: `${reason} | Responsable: ${message.author.username}` });
        message.channel.send(`**${bannedMember.tag}** fue baneado correctamente del servidor`);
      } catch (e) {
        message.channel.send(`:warning: Ocurrió un error: ${e.message}`);
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
