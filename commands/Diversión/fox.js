module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fox',
      description: 'Genera un lindo y agradable zorro 🦊',
      usage: prefix => `\`${prefix}fox\``,
      examples: prefix => `\`${prefix}fox\``,
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
      let img = await require('node-superfetch').get('https://randomfox.ca/floof/'),
        msg = await message.channel.send(client.fns.reply('generating', message));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('¡Zorros!', 'https://i.imgur.com/FzagKZr.png')
        .setImage(img.body.image);
      msg.edit('** **', { embed });
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
