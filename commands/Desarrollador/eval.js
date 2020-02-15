const { MessageEmbed, MessageAttachment } = require('discord.js'),
  { exec } = require('child_process'),
  util = require('util');
module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evalúa código',
      usage: prefix => `\`${prefix}eval <código>\``,
      examples: prefix => `\`${prefix}eval client.ws.ping\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 0.1,
      aliases: ['ev'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let author = message.author,
        member = message.member,
        guild = message.guild,
        channel = message.channel,
        msg = message;
      try {
        let evalued = await eval(args.join(' '));
        if (typeof evalued !== 'string') evalued = util.inspect(evalued, { depth: 0 });
        if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs', usage: this.help.usage(message.prefix), message }));
        else if (evalued.length > 1950) message.channel.send(client.message({ emoji: 'red', razón: 'el resultado es muy largo', message }));
        else if (evalued.includes(client.config.token || client.config.mongo || client.dbl.token)) message.channel.send(client.message({ emoji: 'red', razón: 'el resultado contiene un token', message }));
        else message.channel.send(client.message({ emoji: 'green', razón: 'código evaluado correctamente', message }) + '```js\n' + evalued + '\n```');
      } catch (err) {
        message.channel.send(client.message({ emoji: 'red', razón: 'error en el código', message }) + '```js\n' + err.toString() + '\n```');
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
