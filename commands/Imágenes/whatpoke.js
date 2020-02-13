module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'whatpoke',
      description: 'Genera una imagen la cual mete tu avatar en el meme "¿Cuál es este Pokémon?"',
      usage: prefix => `\`${prefix}whatpoke [@usuario]\``,
      examples: prefix => `\`${prefix}whatpoke\``,
      enabled: true,
      cooldown: 5,
      aliases: ['whosthatpkm', 'whatspokemon'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/whatspokemon?url=${(message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 })}`);
      msg.delete();
      message.channel.send(new (require('discord.js').MessageAttachment)(img.raw));
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
