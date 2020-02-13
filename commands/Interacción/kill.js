module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'kill',
      description: 'Demuestra tu lado oscuro y deshaogate con alguien, acabando con su vida',
      usage: prefix => `\`${prefix}kill <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['matar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('Si quieres matarte, puedes utilizar `' + message.prefix + 'suicide` n.n');
      if (message.mentions.users.first() === client.user) return message.channel.send('No me puedes asesinar o.o');
      if (message.mentions.users.size < 1) return message.channel.send('*- Tiene miedo-* Si quieres hacerlo... M... Menciona a alguien *- Llora -*');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** mató a **' + message.mentions.users.first().username + '**')
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
