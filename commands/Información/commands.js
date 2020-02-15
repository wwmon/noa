module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'commands',
      description: 'Muestra la lista de comandos.\n\n> **Parámetros:**\n• `--nodm`, `--nodmhelp`: Cancela el envío de la lista de comandos al mensaje privado y lo hace en el canal que se utilice',
      usage: prefix => `\`${prefix}commands\``,
      examples: prefix => `\`${prefix}commands\``,
      enabled: true,
      cooldown: 15,
      aliases: ['comandos', 'c'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let order = { INFORMACIÓN: 10, ÚTILES: 20, DIVERSIÓN: 30, IMÁGENES: 40, REACCIÓN: 50, INTERACCIÓN: 60 },
        cats = [];
      if (message.channel.nsfw) {
        order.INTERACCIÓN_NSFW = 70;
        order.NSFW = 80;
      }
      if (message.guild) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) order.MODERACIÓN = 90;
        if (message.member.permissions.has('MANAGE_GUILD')) order.ADMINISTRACIÓN = 100;
      }
      if (client.config.owners.includes(message.author.id)) order.DESARROLLADOR = 110;
      client.commands.forEach(cmd => {
        if (!cats.includes(cmd.help.category)) cats.push(cmd.help.category);
      });
      let temp = [];
      for (let i = 0; i < cats.length; i++) temp.push(null);
      for (let cat of cats) temp[order[cat.toUpperCase()]] = cat;
      cats = temp.filter(x => x !== null);
      let jav = await client.users.fetch(client.config.owners[1]),
        mon = await client.users.fetch(client.config.owners[0]);
      cats.forEach(c => {
        let cmds = client.commands.filter(C => C.help.category === c);
        embed.addField('• ' + c + ' [' + cmds.size + ']', cmds.map(u => `\`${u.help.name}\``).join(', '));
      });
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('Comandos de ' + client.config.bot, client.user.displayAvatarURL())
        .addField('• Ocultos [??]', '¡Descúbrelos por ti mismo!')
        .setImage(client.config.banner)
        .setFooter(`Total de comandos: ${client.commands.size - client.commands.filter(C => C.help.category === 'Ocultos').size - client.commands.filter(C => C.help.category === 'Desarrollador').size} | Desarrollado por: ${jav.tag} y ${mon.tag}`)
        .setTimestamp();
      if (!args[0]) {
        let msg = await message.channel.send(client.fns.reply('dm', message));
        try {
          await message.author.send({ embed });
        } catch (e) {
          msg.edit(client.message({ emoji: 'red', razón: 'parece que tienes los mensajes directos desactivados', usage: this.help.usage(message.prefix), message }));
        }
      } else if (args[0].toLowerCase() === '--nodm' || args[0].toLowerCase() === '--nodmhelp') {
        message.channel.send({ embed });
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message
      });
    }
  }
};
