module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'mute',
      description: 'Silencia al usuario mencionado de casi todos los canales del servidor',
      usage: prefix => `\`${prefix}mute <@usuario> [razón]\``,
      examples: prefix => `\`${prefix}mute @Kayak#8292 Lenguaje inapropiado.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: ['silenciar'],
      botPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      memberPermissions: ['KICK_MEMBERS'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let member = message.mentions.members.first();
      if (!member || !args[0]) return message.channel.send('Mencioná al usuario que debo silenciar');
      if (member === message.member) return message.channel.send(client.fns.tryingAutoInfract(message));
      if (member === message.guild.me) return message.channel.send('No puedo auto-silenciarme, intenta con alguien más');
      if (!member.roles.highest.comparePositionTo(message.guild.me.roles.cache.highest) > 0) return message.channel.send('No puedo silenciar al usuario mencionado. Es posible que no tenga el rango requerido o el usuario es superior a mí');
      let role = message.guild.roles.cache.get(data.guild.moderation.mute.role),
        reason = args.slice(1).join(' ');
      if (role) {
        member.roles.add(role);
      } else {
        let r = await message.guild.roles.cache.create({
          data: {
            name: 'Silenciado',
            color: 0x000000
          },
          reason: 'Rol silenciado'
        });
        message.guild.channels.cache.forEach(c => {
          c.overwritePermissions({
            permissionOverwrites: [
              {
                id: r.id,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
              }
            ]
          });
        });
        data.guild.moderation.mute.role = r.id;
        data.guild.save();
        member.roles.add(r.id);
      }
      embed
        .setColor(client.selectColor('blue'))
        .setTitle('Nuevo caso: `silencio`')
        .addField('Usuario', `${member.user.toString()} (\`${member.id}\`)`)
        .addField('Moderador', `${message.author.toString()} (\`${message.author.id}\`)`)
        .addField('Razón', reason ? reason : 'Sin razón');
      message.channel.send({ embed });
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
