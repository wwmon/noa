module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: '3000years',
      description: 'Genera una imagen de Pokémon con el meme "3000 años han pasado"',
      usage: prefix => `\`${prefix}3000years [@usuario]\``,
      examples: prefix => `\`${prefix}3000years\``,
      enabled: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client,
      { createCanvas, loadImage } = require('canvas');
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        base = await loadImage('https://i.imgur.com/NZiF9Md.png'),
        avatar = await loadImage((message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png' })),
        canvas = createCanvas(base.width, base.height),
        ctx = canvas.getContext('2d');
      ctx.drawImage(base, 0, 0);
      ctx.drawImage(avatar, 461, 127, 200, 200);
      msg.delete();
      message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: '3000-years.png' }] });
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
