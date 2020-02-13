module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'unban',
      description: 'Revoca el baneo de un usuario en el servidor',
      usage: prefix => `\`${prefix}unban <@usuario> [razón]\``,
      examples: prefix => `\`${prefix}unban \``,
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

      if (!args[0]) return message.channel.send('Por favor provee una ID para desbanear a un usuario');
      let bannedMember = await client.users.fetch(args[0]);
      if (!bannedMember) return message.channel.send(`Por favor ingresa la ID de un usuario para desbanear`);
      if (message.guild.members.cache.get(bannedMember).deleted == false) return message.channel.send(`El usuario que intentas desbanear, no se encuentra baneado`);
      let reason = args.slice(1).join(' ');
      if (!reason) reason = 'No especificada';

      if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`No tengo permisos para ejecutar este comando`);

      message.guild.members.cache.unban(bannedMember, reason);
      message.channel.send(`**${bannedMember.tag}** fue desbaneado correctamente del servidor`);
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
