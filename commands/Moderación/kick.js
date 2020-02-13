module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'kick',
      description: 'Expulsa a un servidor del usuario',
      usage: prefix => `\`${prefix}kick <@usuario> <razón>\``,
      examples: prefix => `\`${prefix}kick @Pepito#8293 Avatar inapropiado.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: ['KICK_MEMBERS'],
      memberPermissions: ['KICK_MEMBERS'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    const Discord = require('discord.js');
    try {
      let kUser = message.guild.member(message.mentions.users.first());
      let reason = args.join(' ').slice(22);

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(client.fns.noPerm(message));
      if (!kUser) return message.channel.send('Menciona el usuario que será expulsado');
      if (message.mentions.users.first() == client.user) return message.channel.send(`No puedo hacer esto, intenta con otro`);
      if (message.mentions.users.first() == message.author) return message.channel.send(client.fns.tryingAutoInfract(message));
      if (!reason) return message.channel.send(`Específica la razón de la expulsion`);
      if (!message.guild.member(kUser).bannable) return message.channel.send(`No puedo expulsar al usuario mencionado. Es posible que no tenga el rango requerido o el usuario es superior a mí`);

      kUser.kick(`${reason} | Responsable: ${message.author.tag}`);

      const finalEmbed = new Discord.MessageEmbed()
        .setColor(client.selectColor('orange'))
        .setAuthor(`[KICK] ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`, message.mentions.users.first().displayAvatarURL())
        .addField('Usuario', `<@${kUser.id}> (\`${kUser.id}\`)`, true)
        .addField('Razón', reason, true)
        .addField('Moderador', `<@${message.author.id}>`, true);
      message.channel.send(finalEmbed);

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Fuiste expulsado de un servidor`, message.guild.iconURL())
        .addField(`Servidor`, `${message.guild.name}`, true)
        .addField(`Razón`, `${reason}`, true)
        .addField(`Moderador`, `${message.author.tag}`, true)
        .setColor(client.selectColor('orange'));
      kUser.send(embed);
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
