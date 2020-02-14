module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Recarga todos los comandos o uno en específico',
      usage: prefix => `\`${prefix}reload [comando]\``,
      examples: prefix => `\`${prefix}reload\n${prefix}reload blacklist\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 4,
      aliases: ['refresh', 'restart', 'r'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        message.channel.send(client.message({ emoji: 'green', razón: 'reiniciando bot, esto puede durar unos segundos', message }));
        setTimeout(() => process.exit(), 1500);
      } else {
        let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) message.channel.send(client.message({ emoji: 'red', razón: 'comando no encontrado', message }));
        else {
          await client.unloadCommand(cmd.config.location, cmd.help.name);
          await client.loadCommand(cmd.config.location, cmd.help.name);
          return message.channel.send(client.message({ emoji: 'green', razón: 'el comando `' + cmd.help.name + '` se reinició correctamente', message }));
        }
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
