module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'softban',
      description: 'Banea a un usuario y elimina sus mensajes en los últimos 7 días',
      usage: prefix => `\`${prefix}softban <@usuario> <razón>\``,
      examples: prefix => `\`${prefix}softban @Hula#9293 Traición al servidor\``,
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
    const Discord = require('discord.js');
    try {
      let bUser = message.guild.member(message.mentions.users.first());
      let reason = args.join(' ').slice(22);

      if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(client.fns.noPerm(message));
      if (!bUser) return message.channel.send('Menciona el usuario que será baneado');
      if (message.mentions.users.first() == client.user) return message.channel.send(`No puedo hacer esto, intenta con otro`);
      if (message.mentions.users.first() == message.author) return message.channel.send(client.fns.tryingAutoInfract(message));
      if (!reason) return message.channel.send(`Específica la razón del baneo`);
      if (!message.guild.member(bUser).bannable) return message.channel.send(`No puedo banear al usuario mencionado. Es posible que no tenga el rango requerido o el usuario es superior a mí`);

      bUser.ban({ days: 7, reason: `${reason} | Responsable: ${message.author.tag}` });

      const finalEmbed = new Discord.MessageEmbed()
        .setColor(client.selectColor('red'))
        .setAuthor(`[SOFTBAN] ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`, message.mentions.users.first().displayAvatarURL())
        .addField('Usuario', `<@${bUser.id}> (\`${bUser.id}\`)`, true)
        .addField('Razón', reason, true)
        .addField('Moderador', `<@${message.author.id}>`, true);
      message.channel.send(finalEmbed);

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Fuiste baneado de un servidor`, message.guild.iconURL())
        .addField(`Servidor`, `${message.guild.name}`, true)
        .addField(`Razón`, `${reason}`, true)
        .addField(`Moderador`, `${message.author.tag}`, true)
        .setColor(client.selectColor('red'));
      bUser.send(embed);
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
