module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'catch',
      description: 'Comando oculto #1\n\n¡Atrapa a tus amigos al estilo Pokémon!',
      usage: prefix => `\`${prefix}catch <@usuario>\``,
      examples: prefix => `\`${prefix}catch @Alpha#8465\``,
      enabled: true,
      guildOnly: true,
      cooldown: 3,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let poke = Math.floor(Math.random() * 8),
        user = message.mentions.users.first(),
        ball = embed.setColor('FF0008').setFooter(client.config.bot + ' | Comandos oculto #1');
      if (!args[0] || !user) {
        let gifs = ['https://media.giphy.com/media/DFqVL9xH2g6Zy/giphy.gif', 'https://media.giphy.com/media/Eu75SA0s54toc/giphy.gif'];
        let non = new (require('discord.js').MessageEmbed)().setDescription('**' + message.author.username + '** se está preparando para lanzar una pokéball');
        return message.channel.send({ embed: non });
      }
      if (user === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'si te atrapas, no podrás salir', usage: this.help.usage(message.prefix), message }));
      if (user === client.user) return message.channel.send(client.message({ emoji: 'red', razón: '¡yo no soy un pokémon!', usage: this.help.usage(message.prefix), message }));
      if (poke === 1) {
        let gifs = ['https://media1.tenor.com/images/62306372330de14f39e09c0634b817aa/tenor.gif?itemid=5203776', 'https://media.giphy.com/media/W04QVzelTHsNW/giphy.gif', 'https://media1.tenor.com/images/22c41837a76d107af3ca2b7eeb09e18f/tenor.gif?itemid=8932614', 'https://media1.tenor.com/images/3ffcf73836d27313cdda846599d50f97/tenor.gif?itemid=5634823', 'https://media1.tenor.com/images/740cc5ac92bad28561bcf2e01d11647c/tenor.gif?itemid=5726646'];
        embed.setDescription('**' + message.author.username + '** lanzó muchas pokéballs a **' + user.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else if (poke === 2) {
        let gifs = ['https://media1.tenor.com/images/c7346d56327b922af77ddf51aeed6863/tenor.gif?itemid=5455185', 'https://media.giphy.com/media/gb8oBoaxZb2FO/giphy.gif', 'https://media1.tenor.com/images/22726b4a1b9180f41284e83a0014af3f/tenor.gif?itemid=11792063', 'https://media1.tenor.com/images/46019cd1fad53df880494da1d3674333/tenor.gif?itemid=4889505', 'https://media1.tenor.com/images/482d5b2a0904df8a0773f0221f47afc6/tenor.gif?itemid=8176049'];
        embed.setDescription('**' + message.author.username + '** le lanzó una pokéball a **' + user.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else if (poke === 3) {
        embed.setDescription('**' + message.author.username + '** tiró dos pokéballs a **' + user.username + '**').setImage('https://media.giphy.com/media/XD1G6se7v9nKU/giphy.gif');
        message.channel.send(ball);
      } else if (poke === 4) {
        let gifs = ['https://media1.tenor.com/images/b63448ea03bf4a198d95d88d30f58990/tenor.gif?itemid=7465102', 'https://media.giphy.com/media/3ohc0WxXoEcnxf1OUw/giphy.gif', 'https://media1.tenor.com/images/9a4214b4ba25ed9dcc3669a087ca51fc/tenor.gif?itemid=8473063'];
        embed.setDescription('**' + user.username + '** rechaza la pokéball de **' + message.author.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else if (poke === 5) {
        let gifs = ['https://media1.tenor.com/images/f6718b6f393e1e066671dfb738a14f9a/tenor.gif?itemid=4735084', 'https://media.giphy.com/media/Ojn40uErfB6es/giphy.gif'];
        embed.setDescription('**' + user.username + '** se escapó de la pokeball de **' + message.author.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else if (poke === 6) {
        let gifs = ['https://media1.tenor.com/images/9e919ccf601ffec0724b6e059140e3e4/tenor.gif?itemid=5284549', 'https://media1.tenor.com/images/9e919ccf601ffec0724b6e059140e3e4/tenor.gif?itemid=5284549', 'https://media1.tenor.com/images/daefa834aefd75849f70cf17b679b3c2/tenor.gif?itemid=8988857'];
        embed.setDescription('**' + user.username + '** está luchando contra la pokeball de **' + message.author.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else if (poke === 7) {
        let gifs = ['https://media1.tenor.com/images/737f4a6484d54260175b755c8e936799/tenor.gif?itemid=7413854', 'https://media1.tenor.com/images/fcbd46980ac07510ef0396e37276df48/tenor.gif?itemid=5752206', 'https://media1.tenor.com/images/c3841bad1a51e75cf7dc50a789277dbc/tenor.gif?itemid=8091067'];
        embed.setDescription('**' + message.author.username + '** atrapó a **' + user.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
      } else {
        let gifs = ['https://media1.tenor.com/images/381aa78520df66c4935a9679a71c68aa/tenor.gif?itemid=7226049', 'https://media.giphy.com/media/uWLJEGCSWdmvK/giphy.gif'];
        embed.setDescription('**' + message.author.username + '** le mostró su pokéball a **' + user.username + '**').setImage(gifs[Math.floor(gifs.length * Math.random())]);
        message.channel.send(ball);
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
