module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'dog',
      description: 'Se encarga de buscar perros hermosos 🐶\n> **Parámetros:**\n~ `--shiba`: Genera un perro raza Shiba\n~ `--husky`: Genera un perro raza Husky.\n~ `--boxer`: Genera un perro raza Boxer.\n~ `--dalmata` | `--dalmatian`: Genera un perro Dálmata.\n~ `--chihuaha`: Genera un perrito Chihuahua',
      usage: prefix => `\`${prefix}dog\``,
      examples: prefix => `\`${prefix}dog --shiba\``,
      enabled: true,
      aliases: ['perro'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message));
      embed.setAuthor('Woof! ▼・ᴥ・▼', 'https://i.imgur.com/22903G7.png').setColor(client.fns.selectColor('lightcolors'));
      if (!args[0]) {
        let img = await require('node-superfetch').get('https://random.dog/woof.json?filter=mp4,webm');
        embed.setImage(img.body.url);
        msg.edit({ embed });
      } else if (args[0].toLowerCase() === '--shiba') {
        let img = await require('node-superfetch').get('http://shibe.online/api/shibes');
        embed.setImage(img.body[0]);
        msg.edit({ embed });
      } else if (args[0].toLowerCase() === '--husky') {
        let img = await require('node-superfetch').get('https://dog.ceo/api/breed/husky/images/random');
        embed.setImage(img.body.message);
        msg.edit({ embed });
      } else if (args[0].toLowerCase() === '--boxer') {
        let img = await require('node-superfetch').get('https://dog.ceo/api/breed/boxer/images/random');
        embed.setImage(img.body.message);
        msg.edit({ embed });
      } else if (args[0].toLowerCase() === '--dalmata' || args[0].toLowerCase() === '--dalmatian') {
        let img = await require('node-superfetch').get('https://dog.ceo/api/breed/dalmatian/images/random');
        embed.setImage(img.body.message);
        msg.edit({ embed });
      } else if (args[0].toLowerCase() === '--chihuahua') {
        let img = await require('node-superfetch').get('https://dog.ceo/api/breed/chihuahua/images/random');
        embed.setImage(img.body.message);
        msg.edit({ embed });
      } else {
        let img = await require('node-superfetch').get('https://random.dog/woof.json?filter=mp4,webm');
        embed.setImage(img.body.url);
        msg.edit({ embed });
      }
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
