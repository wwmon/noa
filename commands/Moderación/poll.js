module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'poll',
      description: 'Crea una votación con las opciones que tú elijas',
      usage: prefix => `\`${prefix}poll <pregunta> ;; <opción1> ;; <opción2> ;; [opción3] ;; [opción4] ;; [opción5]\``,
      examples: prefix => `\`${prefix}poll ¿Qué prefieren? ;; Comer Pizza ;; Comer Ensalada\n${prefix}poll ¿Cuántos años tienes? ;; Menos de 10 años ;; 11-13 años ;; 14-16 años ;; Más de 17 años\n${prefix}poll ¿Cuánto tiempo llevas en Discord? ;; Menos de 2 meses ;; 3-4 meses ;; 5-6 meses ;; Más de 7 meses\n${prefix}poll ¿Que prefieren? ;;Frutas ;; Verduras ;; Carnes ;; Lacteos ;; Ninguna opción\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    let Discord = require('discord.js');
    try {
      args = message.content.slice(7).split(';;');
      let mod = message.author;
      let server = message.guild;

      //Dos Opciones
      const poll2 = new Discord.MessageEmbed()

        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('📊 **' + args[0] + '** \n\n\n🇦 ' + args[1] + ' \n🇧 ' + args[2] + '')
        .setFooter('Votaciones para ' + server.name + '', server.iconURL());

      //Tres Opciones
      const poll3 = new Discord.MessageEmbed()

        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('📊 **' + args[0] + '** \n\n\n🇦 ' + args[1] + ' \n🇧 ' + args[2] + ' \n 🇨 ' + args[3] + '')
        .setFooter('Votaciones para ' + server.name + '', server.iconURL());

      //Cuatro Opciones
      const poll4 = new Discord.MessageEmbed()

        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('📊 **' + args[0] + '** \n\n\n🇦 ' + args[1] + ' \n🇧 ' + args[2] + ' \n 🇨 ' + args[3] + ' \n 🇩 ' + args[4] + '')
        .setFooter('Votaciones para ' + server.name + '', server.iconURL());

      //Cinco Opciones
      const poll5 = new Discord.MessageEmbed()

        .setDescription('📊 **' + args[0] + '** \n\n\n🇦 ' + args[1] + ' \n🇧 ' + args[2] + ' \n🇨 ' + args[3] + ' \n🇩 ' + args[4] + ' \n🇪 ' + args[5] + '')
        .setFooter('Votaciones para ' + server.name + '', server.iconURL())

        .setColor(client.fns.selectColor('lightcolors'));

      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.fns.noPerm(message));

      if (args.length > 6) {
        return message.channel.send(`El máximo de opciones por votación es de cinco`);
      }

      if (!args[0]) {
        return message.channel.send(`Debes proporcionar una pregunta para aplicarla en la votación.\n\n> **Ejemplo de uso:** \`${message.prefix}poll ¿Qué eliges? ;; Pizza ;; Hamburguesa ;; Tacos ;; Burritos ;; Agua\``);
      }

      if (!args[2]) {
        return message.channel.send(`Debes al menos dos opciones para aplicarla en la votación.\n\n> **Ejemplo de uso:** \`${message.prefix}poll ¿Qué eliges? ;; Pizza ;; Hamburguesa ;; Tacos ;; Burritos ;; Agua\``);
      }

      if (!args[3]) {
        return message.channel.send(poll2).then(m => {
          setTimeout(() => {
            m.react('🇦');
          }, 1000);
          setTimeout(() => {
            m.react('🇧');
          }, 1500);
        });
      }

      if (!args[4]) {
        return message.channel.send(poll3).then(m => {
          setTimeout(() => {
            m.react('🇦');
          }, 1000);
          setTimeout(() => {
            m.react('🇧');
          }, 1500);
          setTimeout(() => {
            m.react('🇨');
          }, 2000);
        });
      }

      if (!args[5]) {
        return message.channel.send(poll4).then(m => {
          setTimeout(() => {
            m.react('🇦');
          }, 1000);
          setTimeout(() => {
            m.react('🇧');
          }, 1500);
          setTimeout(() => {
            m.react('🇨');
          }, 2000);
          setTimeout(() => {
            m.react('🇩');
          }, 2500);
        });
      }

      if (!args[6]) {
        return message.channel.send(poll5).then(m => {
          setTimeout(() => {
            m.react('🇦');
          }, 1000);
          setTimeout(() => {
            m.react('🇧');
          }, 1500);
          setTimeout(() => {
            m.react('🇨');
          }, 2000);
          setTimeout(() => {
            m.react('🇩');
          }, 2500);
          setTimeout(() => {
            m.react('🇪');
          }, 3000);
        });
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
