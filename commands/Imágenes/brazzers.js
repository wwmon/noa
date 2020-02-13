module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'brazzers',
      description: 'Genera una imagen con un avatar con el logo de Brazzers',
      usage: prefix => `\`${prefix}brazzers [@usuario]\``,
      examples: prefix => `\`${prefix}brazzers @Pepito#8492\``,
      enabled: true,
      cooldown: 5,
      aliases: ['thisisnotpornhub'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/brazzers?url=${(message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 })}`);
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
