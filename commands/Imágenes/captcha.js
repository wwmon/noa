module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'captcha',
      description: 'Genera una imagen para resolver un captcha con el avatar de un usuario',
      usage: prefix => `\`${prefix}captcha [@usuario]\``,
      examples: prefix => `\`${prefix}captcha\``,
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
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/captcha?url=${i.displayAvatarURL({ format: 'png', size: 2048 })}&username=${i.username}`);
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
