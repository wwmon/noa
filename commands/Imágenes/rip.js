module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'rip',
      description: 'Genera una imagen con un meme de Bob Esponja',
      usage: prefix => `\`${prefix}rip [@usuario]\``,
      examples: prefix => `\`${prefix}rip\``,
      enabled: true,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('marsnpm').rip((message.mentions.users.first() || message.author).displayAvatarURL({ format: 'jpg', size: 2048 }));
      msg.delete();
      message.channel.send({ files: [img] });
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
