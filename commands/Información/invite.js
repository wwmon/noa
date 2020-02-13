module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'invite',
      description: '¡Invita a ' + require('../../config').bot + ' a tu servidor!',
      usage: prefix => `\`${prefix}invite\``,
      examples: prefix => `\`${prefix}invite\``,
      enabled: true,
      cooldown: 2.5,
      aliases: ['iwannahavethisamazingbotinmyserver', 'inv'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('Invitación de ' + client.config.bot, client.user.displayAvatarURL())
        .setDescription('Veo que estas interesado por agregarme a tu servidor >.<\n¡Por aquí abajito te dejo algunos enlaces para que me puedas invitar!')
        .addField('<:DBL:489519574698426369> Discord Bot List', '[¡Clic aquí!](https://noa.wwmon.xyz/dbl)', true)
        .addField('🔗 Enlace Directo', '[¡Clic aquí!](https://noa.wwmon.xyz/invite)', true)
        .setFooter(client.config.bot + ' | Recuerda que para invitarme necesitas tener el permiso de: Administrar el servidor', message.author.displayAvatarURL());
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
