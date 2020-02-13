module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'servers',
      description: 'Conteo de servidores y usuarios que apoyan a ' + require('../../config').bot,
      usage: prefix => `\`${prefix}servers\``,
      examples: prefix => `\`${prefix}servers\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('Servidores de ' + client.config.bot, client.user.avatarURL())
        .setDescription('Actualmente estoy en **' + client.guilds.cache.size + '** servidores y con **' + client.userCount.toLocaleString() + '** usuarios ❤')
        .setFooter('¡Gracias por apoyar!', message.author.avatarURL());
      message.channel.send({ embed });
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
