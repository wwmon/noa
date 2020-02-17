module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'greet',
      description: 'Saluda a uno de tus compas, como buen amigo que eres',
      usage: prefix => `\`${prefix}greet <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 3,
      aliases: ['wave', 'saludar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'heart', razón: `si solamente quieres saludar usa \`${message.prefix}hello ^^\``, usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() === client.user) return message.channel.send(client.message({ emoji: 'heart', razón: 'holiii~', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs menciona a esa persona que quieres ', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** saluda a **' + message.mentions.users.first().username + '**')
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
