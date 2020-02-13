module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'ship',
      description: 'Shippea a dos usuarios por sus apodos en el servidor',
      usage: prefix => `\`${prefix}ship <@usuario1> <@usuario2>\``,
      examples: prefix => `\`${prefix}ship @Noa#3164 @Hinata#1200\``,
      enabled: true,
      guildOnly: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.members.size < 1 || !args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'debes de mencionar a 2 personas para shippear', message }));
      else if (message.mentions.members.first() == message.member) message.channel.send(client.fns.message({ emoji: 'red', razón: 'tú no puedes ser el primer ship', message }));
      else {
        let shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member,
          shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member,
          first_length = Math.round(shipper.displayName.length / 2),
          first_half = shipper.displayName.slice(0, first_length),
          second_length = Math.round(shipped.displayName.length / 2),
          second_half = shipped.displayName.slice(second_length),
          final_name = first_half + second_half;
        message.channel.send(`**${shipped.displayName} + ${shipper.displayName}**\n\nEl shippeo ideal es: **${final_name}**`);
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
