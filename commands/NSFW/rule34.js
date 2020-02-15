module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'rule34',
      description: 'Busca cosas turbias con este comando...',
      usage: prefix => `\`${prefix}rule34 <tag>\``,
      examples: prefix => `\`${prefix}rule34 mon\``,
      enabled: true,
      nsfwOnly: true,
      voteOnly: true,
      cooldown: 3,
      aliases: ['r34'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send('¡Vamos! Anímate a buscar lo que siempre quisiste...');
      else {
        let deep = ['mon', 'loli', 'shota', 'cub', 'young', 'child', 'baby', 'guro', 'gore', 'vore'],
          img = await require('node-superfetch').get(`https://rule34.xxx?page=dapi&s=post&q=index&limit=100&tags=${encodeURI(`${args.join('_')}+rating:explicit`)}&json=1`),
          msg = await message.channel.send(client.fns.reply('generating', message));
        let result;
        try {
          result = JSON.parse(img.body);
        } catch (e) {
          return msg.edit(client.message({ emoji: 'red', razón: 'no se encontraron resultados', message }));
        }
        if (!result) msg.edit(client.message({ emoji: 'red', razón: 'no se encontraron resultados', message }));
        else {
          result = result[Math.floor(Math.random() * result.length)];
          let tagString = result.tags.split(' ');
          if (tagString.length > 2047) tagString = args.join(' ');
          if (tagString.length > 0) {
            if (tagString.some(x => deep.includes(x.toLowerCase()))) return msg.edit(client.message({ emoji: 'red', razón: 'tu búsqueda está vetada, intenta con otra cosa...', message }));
            else {
              embed
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(`Imagen Original`)
                .setURL(`https://rule34.xxx/images/${result.directory}/${result.image}`)
                .setDescription(`**Puntaje:** ${result.score}\n**Tags:** ${tagString}`)
                .setColor(client.fns.selectColor('lightcolors'))
                .setImage(`https://rule34.xxx/images/${result.directory}/${result.image}`);
              msg.edit('** **', { embed });
            }
          }
        }
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
