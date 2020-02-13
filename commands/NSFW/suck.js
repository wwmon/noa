module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'suck',
      description: 'Lame/chupa el miembro de alguien',
      usage: prefix => `\`${prefix}suck <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      nsfwOnly: true,
      voteOnly: true,
      cooldown: 3,
      aliases: ['blowjob'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('Imposible de hacer!');
      if (message.mentions.users.first() === client.user) return message.channel.send('Conmigo no');
      if (message.mentions.users.size < 1) return message.channel.send('Elige a quien mamarsela');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** se la chupa a **' + message.mentions.users.first().username + '**')
        .setImage(client.fns.gifs(this.help.name));
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
