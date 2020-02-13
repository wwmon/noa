module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'grayscale',
      description: 'Genera un filtro de imagen, el cual pone de tono gris tu avatar',
      usage: prefix => `\`${prefix}grayscale [@usuario]\``,
      examples: prefix => `\`${prefix}grayscale\``,
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
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/greyscale?url=${(message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 })}`);
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
