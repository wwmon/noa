module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'wanted',
      description: 'Genera un avatar con un avatar en un postér de "El más búscado"',
      usage: prefix => `\`${prefix}wanted [@usuario]\``,
      examples: prefix => `\`${prefix}wanted\``,
      enabled: false,
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
        avatar = await require('canvas').loadImage((message.mentions.users.first() || message.author).displayAvatarURL({ format: 'jpg' })),
        base = await require('canvas').loadImage('https://i.imgur.com/nW3Ta8p.png'),
        canvas = require('canvas').createCanvas(base.width, base.height),
        ctx = canvas.getContext('2d');
      ctx.drawImage(base, 0, 0);
      ctx.drawImage(avatar, 150, 360, 430, 430);
      sepia(ctx, 150, 360, 430, 430);
      msg.delete();
      message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'wanted.png' }] });
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
function sepia(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    const brightness = 0.34 * data.data[i] + 0.5 * data.data[i + 1] + 0.16 * data.data[i + 2];
    data.data[i] = brightness + 100;
    data.data[i + 1] = brightness + 50;
    data.data[i + 2] = brightness;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}
