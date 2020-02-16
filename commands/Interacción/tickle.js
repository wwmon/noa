module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'tickle',
      description: 'Hazle cosquillas a tus amigos',
      usage: prefix => `\`${prefix}tickle <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['cosquillas'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author || !message.mentions.users.first()) {
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setDescription(client.fns.reply('tickle', message))
          .setImage(client.fns.gifs(this.help.name));
        message.channel.send({ embed });
        return;
      }
      if (message.mentions.users.first() === client.user) return message.channel.send(client.message({ emoji: ':sob:', razón: 'las cosquillas son mi mayor debilidad, ¡no lo hagas!', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le está haciendo cosquillas a **' + message.mentions.users.first().username + '**')
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
