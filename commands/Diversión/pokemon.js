module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pokémon',
      description: 'Adivina el Pokémon',
      usage: prefix => `\`${prefix}pokemon\``,
      examples: prefix => `\`${prefix}pokemon\``,
      enabled: true,
      aliases: ['pokemon'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let rand = Math.floor(Math.random() * 802),
        poke = rand > 0 ? rand : Math.floor(Math.random() * 802),
        pokem = client.pokemon[poke];
      embed
        .setTitle('¿Cuál es este Pokémon?')
        .setImage(pokem.imageURL)
        .setColor(client.fns.selectColor('green'));
      let msg = await message.channel.send({ embed }),
        filter = m => m.author.id === message.author.id,
        attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });
      attempts = await attempts.first();
      if (!attempts) {
        msg.edit({ embed: { color: 0xc82828, title: '<:pokemonLeft:600412308912734262> ¿Cuál es este Pokémon?', image: { url: pokem.imageURL } } });
        return message.channel.send('Tardaste mucho tiempo en escribir, por lo tanto al Pokémon le ha dado tiempo de escaparse');
      }
      let answer = attempts.content.toLowerCase();
      if (answer === pokem.name.toLowerCase()) {
        await msg.edit({ embed: { color: 0x3ce3f7, title: '<:pokeball:600408195457875971> ¿Cuál es este Pokémon?', image: { url: pokem.imageURL } } });
        return msg.channel.send(`Bien hecho, **${pokem.name[0].toUpperCase()}${pokem.name.slice(1)}** fue atrapado!`);
      }
      await msg.edit({ embed: { color: 0xc82828, title: '<:pokemonLeft:600412308912734262> ¿Cuál es este Pokémon?', image: { url: pokem.imageURL } } });
      return msg.channel.send('Oops, te has equivocado y el Pokémon se escapó');
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
