module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'triggered',
      description: 'Genera un GIF con un avatar aplicándole el efecto triggered',
      usage: prefix => `\`${prefix}triggered [@usuario]\``,
      examples: prefix => `\`${prefix}triggered\``,
      enabled: true,
      cooldown: 10,
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
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/triggered?url=${i}`);
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
