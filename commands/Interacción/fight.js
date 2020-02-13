module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fight',
      description: 'Empieza una pelea con alguien más',
      usage: prefix => `\`${prefix}fight <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['pelear'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.reply('No seas demente... Busca otro adversario');
      if (message.mentions.users.first() === client.user) return message.reply('No seas demente... Busca otro adversario por que no quiero pelear contigo :p');
      if (message.mentions.users.size < 1) return message.channel.send('Si no eres raro... Debes decidir con quien pelear -n-');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está peleando contra **' + message.mentions.users.first().username + '**')
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
