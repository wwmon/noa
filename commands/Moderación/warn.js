module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'warn',
      description: '',
      usage: prefix => `\`${prefix}warn <@usuario> <razón>\``,
      examples: prefix => `\`${prefix}warn Hyp#9293 Irrespeto a los demás.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: ['w'],
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
      let warns = JSON.parse(fs.readFileSync('./assets/jsonFiles/warnings.json', 'utf8'));

      if (!warns[message.guild.id]) {
        warns[message.guild.id] = {};
      }

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(client.fns.noPerm(message));

      let wUser = message.guild.member(message.mentions.users.first());
      if (message.mentions.users.first() === client.user) return message.channel.send(`No me puedes dar auto advertencia`);
      if (!wUser) return message.channel.send('Menciona el usuario a warnear');
      if (message.mentions.users.first() == message.author) return message.channel.send(client.fns.tryingAutoInfract(message));
      let reason = args.join(' ').slice(22);
      let warnserver = warns[message.guild.id];
      if (!reason) return message.channel.send('Específica la razón del warn');

      if (!warnserver[wUser.id]) {
        warnserver[wUser.id] = {
          warns: 0
        };
      }

      warnserver[wUser.id].warns++;

      fs.writeFile('./assets/jsonFiles/warnings.json', JSON.stringify(warns), err => {
        if (err) console.log(err);
      });

      let warnEmbed = new Discord.MessageEmbed()
        .setColor(client.selectColor('blue'))
        .setAuthor(`[WARN] ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`, message.mentions.users.first().displayAvatarURL)
        .addField('Usuario', `<@${wUser.id}> (\`${wUser.id}\`)`, true)
        .addField('Moderador', `<@${message.author.id}>`, true)
        .addField('Razón', reason, true)
        .setFooter(`Este usuario lleva acumulado ${warnserver[wUser.id].warns} advertencias`);

      message.channel.send(warnEmbed);

      let dmAdv = new Discord.MessageEmbed()
        .setAuthor('¡Fuiste advertido!', message.guild.iconURL)
        .setDescription(`Recibiste una advertencia desde \`${message.guild.name}\`. Ten mucho cuidado por que si acumulas 3 advertencias podrías muteado del servidor`)
        .addField('Razón', reason)
        .addField('Responsable', message.author.tag)
        .setTimestamp()
        .setFooter(`Contador de advertencias: ${warnserver[wUser.id].warns}/5`)
        .setColor(client.selectColor('blue'));

      wUser.send(dmAdv);

      if (warnserver[wUser.id].warns == 3) {
        if (!message.guild.member(wUser).bannable) return;

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

        let mutetime = '1h';
        await wUser.addRole(muterole.id);
        message.channel.send(`<@${wUser.id}> fue muteado temporalmente por acumulación de advertencias`);

        setTimeout(function() {
          wUser.removeRole(muterole.id);
          message.channel.send(`<@${wUser.id}> ha sido desmuteado por ${client.user}`);
        }, ms(mutetime));
      }

      if (warnserver[wUser.id].warns == 5) {
        if (!message.guild.member(wUser).bannable) return;
        message.guild.member(wUser).kick(reason);
        message.channel.send(`<@${wUser.id}> fue kickeado del servidor por acumulaciónde warns`);
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
