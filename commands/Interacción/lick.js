module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'lick',
      description: 'Lame a tu objetivo. UwU/',
      usage: prefix => `\`${prefix}lick <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['lamer'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) {
        return message.channel.send('No quiero lamerte *- Vomita -*');
      }
      if (message.mentions.users.first() == client.user) return message.channel.send('No me gusta ser lamida por otros');
      if (message.mentions.users.size < 1) return message.channel.send('Te veo muy ansioso... Menciona a alguien *- Saca la lengua -*');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está lamiendo a **' + message.mentions.users.first().username + '**')
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
