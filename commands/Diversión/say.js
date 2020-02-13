module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'say',
      description: 'Repetiré el texto que digas',
      usage: prefix => `\`${prefix}say <texto>\``,
      examples: prefix => `\`${prefix}say ¡Los amo a todos! :heart:\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs escribe para que te repita, diré lo que quieras *- risa maligna -*', usage: this.help.usage(message.prefix), message }));
      else {
        message.guild && message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES') ? message.delete() : null;
        message.channel.send(args.join(' '), { disableEveryone: !message.channel.permissionsFor(message.member).has('MENTION_EVERYONE') ? true : false });
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
