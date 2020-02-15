module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'unwarn',
      description: 'Remueve una advertencia a un usuario',
      usage: prefix => `\`${prefix}unwarn <@usuario> [razón]\``,
      examples: prefix => `\`${prefix}unwarn Hyp#9293 Apelación exitosa.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: ['KICK_MEMBERS'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    const fs = require('fs');
    const ms = require('ms');
    const Discord = require('discord.js');
    try {
      let warns = JSON.parse(fs.readFileSync('./assets//jsonFiles/warnings.json', 'utf8'));

      if (!warns[message.guild.id]) {
        warns[message.guild.id] = {};
      }

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(client.fns.noPerm(message));
      let wUser = message.mentions.users.first();
      if (!wUser) return message.channel.send('Debes mencionar al usuario que se le borrará una advertencia');
      if (message.mentions.users.first() == client.user) return message.channel.send(`No puedes hacerlo conmigo`);
      if (message.mentions.users.first() == message.author) return message.channel.send('Lo siento, pero no puedes ejercer esta acción sobre ti mismo');
      let reason = args.join(' ').slice(22);
      let warnserver = warns[message.guild.id];
      if (!reason) {
        reason = `No específicada`;
      }

      if (!warnserver[wUser.id]) {
        warnserver[wUser.id] = {
          warns: 0
        };
      }

      if (warnserver[wUser.id].warns <= 0) return message.channel.send('No puedes remover una advertencia a este usuario por que no posee ningúna');
      warnserver[wUser.id].warns--;

      fs.writeFile('./assets/jsonFiles/warnings.json', JSON.stringify(warns), err => {
        if (err) console.log(err);
      });

      let warnEmbed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`[UNWARN] ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`, message.mentions.users.first().displayAvatarURL)
        .addField('Usuario', `<@${wUser.id}> (\`${wUser.id}\`)`, true)
        .addField('Moderador', `<@${message.author.id}>`, true)
        .addField('Razón', reason, true)
        .setFooter(`Número de advertencias: ${warnserver[wUser.id].warns}`);

      message.channel.send(warnEmbed);

      /*
      let dmAdv = new Discord.MessageEmbed()
      .setAuthor('¡Fuiste des-advertido!', message.guild.iconURL)
      .setDescription(`Una advertencia desde \`${message.guild.name}\` te fue removida`)
      .addField('Razón', reason)
      .addField('Responsable', message.author.tag)
      .setTimestamp()
      .setFooter(`Contador de advertencias: ${warnserver[wUser.id].warns}/5`)
      .setColor(green[result])

      wUser.send(dmAdv)
      */
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
