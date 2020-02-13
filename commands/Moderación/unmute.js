module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'unmute',
      description: 'Revoca el silencio de un usuario en el servidor',
      usage: prefix => `\`${prefix}unmute <@usuario> [razón]\``,
      examples: prefix => `\`${prefix}unmute @mon#6969\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
      memberPermissions: ['KICK_MEMBERS'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(client.fns.noPerm(message));
      let mUser = message.guild.member(message.mentions.users.first());
      let pedir = message.mentions.users.first();
      if (!mUser) return message.channel.send(`Menciona al usuario que al que debo remover su silenciamiento`);

      if (pedir === message.author) return message.channel.send(client.fns.tryingAutoInfract(message));
      if (pedir == client.user) return message.channel.send(`No puede hacer esto sobre mi, intenta con otro`);

      let mutedrole = mUser.roles.find(`name`, 'Silenciado');

      if (!message.guild.member(mUser).bannable) return message.channel.send(`No puedo quita el silencio al usuario mencionado. Es posible que no tenga el rango requerido o el usuario es superior a mí`);

      let reason = message.content
        .split(' ')
        .slice(2)
        .join(' ');
      if (!reason) {
        reason = 'No específicada';
      }

      let muterole = message.guild.roles.cache.find(`name`, 'Silenciado');

      if (!muterole) {
        try {
          muterole = await message.guild.createRole({
            name: 'Silenciado',
            color: '#000000',
            permissions: []
          });
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        } catch (e) {
          console.log(e.stack);
        }
      }

      let mutetime = args[1];

      await mUser.removeRole(muterole.id);
      embed
        .setColor(client.selectColor('green'))
        .setAuthor(`[UNMUTE] ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`, message.mentions.users.first().displayAvatarURL)
        .addField('Usuario', `<@${mUser.id}> (\`${mUser.id}\`)`, true)
        .addField('Razón', reason, true)
        .addField('Moderador', `<@${message.author.id}>`, true);
      message.channel.send(embed);
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
