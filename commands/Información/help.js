module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Te mostraré un mensaje de ayuda con información básica de su uso. También muestra la ayuda especializada de un comando',
      usage: prefix => `\`${prefix}help [comando]\``,
      examples: prefix => `\`${prefix}help help\``,
      enabled: true,
      cooldown: 2,
      aliases: ['h'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let o = await client.users.fetch(client.config.owners[1]),
        mon = await client.users.fetch(client.config.owners[0]);
      if (!args[0]) {
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setThumbnail(client.user.avatarURL)
          .setAuthor('Comando de ayuda de ' + client.config.bot, client.user.avatarURL())
          .setDescription('¡Hola! Soy **' + client.config.bot + '** y por aquí te dejaré alguna información importante que debes saber por si necesitas ayuda')
          .addField('• Prefijo', 'Para utilizar mis comandos debes poner el prefijo **`' + message.prefix + '`** antes de cada uno.\nTambién podrás mencionar a ' + client.config.bot + ' como prefijo (' + client.user.toString() + ' help)')
          .addField('• Ayuda', 'Puedes ver la ayuda detallada de algún comando usando `' + message.prefix + 'help <comando>`')
          .addField('• Lista de comandos', 'Si quieres ver mi lista de comandos, utiliza **`' + message.prefix + 'commands`** y recibirás la lista de comandos por mensaje privado')
          .addField('• Enlaces:', '[Invítame ❤️](https://noa.wwmon.xyz/invite) | [Soporte ❓](https://noa.wwmon.xyz/support) | [Donaciones 💝](https://noa.wwmon.xyz/donate) | [top.gg 🤖](https://noa.wwmon.xyz/dbl) | [Vota 📥](https://noa.wwmon.xyz/vote) | [Web (WIP) 🌐](https://noa.wwmon.xyz/)')
          .setImage(client.config.banner)
          .setFooter('Desarrollado por: ' + o.tag + ' y ' + mon.tag)
          .setTimestamp();
        message.channel.send({ embed });
      } else {
        let ayu = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!ayu) return message.channel.send('Ese comando no existe ewe');
        if (ayu.help.category === 'Ocultos') return message.channel.send('Ehmmm... no sé de que me estás hablando! T-te juro q-que no... sé nada... 🙄');
        if (ayu.config.cooldown === 0) ayu.config.cooldown = 2.5;
        embed
          .setTitle('Información del comando: ' + (ayu.help.name[0].toUpperCase() + ayu.help.name.slice(1)))
          .addField('• Descripción', ayu.help.description.length < 1 ? '**Sin descripción**\nSi ves esto, por favor reportalo en mi servidor de soporte: https://noa.wwmon.xyz/support' : ayu.help.description)
          .addField('• Uso', ayu.help.usage(message.prefix))
          .addField('• Ejemplo', ayu.help.examples(message.prefix).length === `${message.prefix.length + 2}` ? 'Ninguno' : ayu.help.examples(message.prefix))
          .addField('• Alias(es)', ayu.config.aliases.length < 1 ? 'Ningúno' : `\`${ayu.config.aliases.join('`, `')}\``, true)
          .addField('• Cooldown', ayu.config.cooldown === 1 ? ayu.config.cooldown + ' segundo' : ayu.config.cooldown + ' segundos', true)
          .addField('• Categoría', `${ayu.help.category}`, true)
          .setColor(client.fns.selectColor('lightcolors'))
          .setFooter(client.config.bot + ' | <> = obligatorio, [] = opcional. No uses estos símbolos al momento de ejecutar el comando', client.user.avatarURL());
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
