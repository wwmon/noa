module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'posterize',
      description: 'Genera un filtro de imagen que posteriza un avatar',
      usage: prefix => `\`${prefix}posterize [@usuario]\``,
      examples: prefix => `\`${prefix}posterize\``,
      enabled: true,
      cooldown: 5,
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
        i = (message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 }),
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/posterize?url=${i}`);
      msg.delete();
      message.channel.send(new (require('discord.js')).MessageAttachment(img.raw));
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
