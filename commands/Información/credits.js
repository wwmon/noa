module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'credits',
      description: 'Muestra todos los usuarios honoríficos que contribuyeron por ' + require('../../config').bot,
      usage: prefix => `\`${prefix}credits\``,
      examples: prefix => `\`${prefix}credits\``,
      enabled: true,
      cooldown: 2.5,
      aliases: ['acknowledgements'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let devMon = await client.users.fetch(client.config.owners[0]),
        devJavi = await client.users.fetch(client.config.owners[1]),
        designDino = await client.users.fetch('410737385509355530'),
        designDevsaider = await client.users.fetch('280985817097306113'),
        designGameboy = await client.users.fetch('288032600705204225'),
        donateRobbieh = await client.users.fetch('284422355147554817'),
        donateMixedxx = await client.users.fetch('348683994474217472'),
        publiRogue = await client.users.fetch('456567119794929684'),
        botKae = await client.users.fetch('431638353189011517');
      embed
        .setAuthor('Contribuidores al desarrollo de ' + client.config.bot, client.user.displayAvatarURL())
        .addField('» Desarrolladores', `~ ${devJavi.tag}\n~ ${devMon.tag}`, true)
        .addField('» Diseñadores', `~ ${designDino.tag}\n~ ${designGameboy.tag}\n~ ${designDevsaider.tag}`, true)
        .addField('» Donadores', `~ ${devMon.tag}\n~ ${donateRobbieh.tag}\n~ ${donateMixedxx.tag}`, true)
        .addField('» Publicista', `~ ${devMon.tag}\n~ ${publiRogue.tag}`, true)
        .addField('» Bot aliado', `~ ${botKae.tag}`, true)
        .setColor(client.fns.selectColor('lightcolors'));
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
