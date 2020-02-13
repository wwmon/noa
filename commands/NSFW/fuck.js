module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fuck',
      description: 'Ve un paso más adelante con otra personas',
      usage: prefix => `\`${prefix}fuck <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      nsfwOnly: true,
      voteOnly: true,
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
      if (message.mentions.users.first() === message.author) return message.channel.send('Eso sería raro... ¡Intenta con otra persona!');
      if (message.mentions.users.first() === client.user) return message.channel.send('No me toques >:c');
      if (message.mentions.users.size < 1) return message.channel.send('Sip, esto es muy raro... Pero debes elegir a alguien para continuar');
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('node-superfetch').get('https://nekos.life/api/v2/img/classic');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** se folló a **' + message.mentions.users.first().username + '**')
        .setImage(img.body.url);
      message.channel.send({ embed });
      
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
