module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'phvideo',
      description: 'Genera una imagen de un video de PornHub. (Non-NSFW)',
      usage: prefix => `\`${prefix}phvideo [@usuario]\``,
      examples: prefix => `\`${prefix}phvideo\``,
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
        i = message.mentions.users.first() || message.author,
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/phvideo?url=${i.displayAvatarURL({ format: 'png', size: 2048 })}&username=${i.username}`);
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
