module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'guildinvites',
      description: 'Encuentra todas las invitaciones de un servidor',
      usage: prefix => `\`${prefix}guildinvites <guild.id>\``,
      examples: prefix => `\`${prefix}guildinvites 470667860360822794\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 4,
      aliases: ['serverinvites'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let s, i;
      if (!args[0]) s = message.guild;
      else s = client.guilds.cache.get(args[0]);
      i = await s.fetchInvites();
      message.channel.send('**Invitaciones encontradas en `' + s.name + '` [' + i.size + ']:**\n' + i.map(x => x.url).join('\n'));
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
