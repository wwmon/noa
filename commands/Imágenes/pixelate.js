module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pixelate',
      description: 'Genera un filtro de imagen que vuelve pixelado un avatar',
      usage: prefix => `\`${prefix}pixelate [@usuario]\``,
      examples: prefix => `\`${prefix}pixelate\``,
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
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/pixelate?url=${(message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 })}`);
      msg.delete();
      message.channel.send(new (require('discord.js').MessageAttachment)(img.raw));
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
