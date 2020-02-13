module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'dodge',
      description: 'Esquiva los ataques / insultos / otros, de un usuario',
      usage: prefix => `\`${prefix}dodge <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      cooldown: 3,
      aliases: ['esquivar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No puedes esquivarte a ti mismo...');
      if (message.mentions.users.first() == client.user) return message.channel.send('No puedes tratar de evitarme jejeje');
      if (message.mentions.users.size < 1) return message.channel.send('Elige a la persona que deseas esquivar...');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** está esquevando a **' + message.mentions.users.first().username + '**')
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
