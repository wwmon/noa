module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pokedex',
      description: 'Busca un pokémon en la pokedex',
      usage: prefix => `\`${prefix}pokedex <pokémon | número>\``,
      examples: prefix => `\`${prefix}pokedex Manaphy\`\n\`${prefix}pokedex 34\``,
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
      if (!args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs debes proporcionar el nombre o número de un Pokémon', usage: this.help.usage(message.prefix), message }));
      else {
        let msg = await message.channel.send(client.fns.reply('pokedex', message)),
          reqs;
        try {
          reqs = await require('node-superfetch').get(`https://pokeapi.glitch.me/v1/pokemon/${args.join('%20')}`, { json: true });
        } catch (e) {
          return msg.edit(client.fns.message({ emoji: 'red', razón: 'no encontré el Pokémon que buscaste, inténtalo de nuevo', message }));
        }
        let poke = reqs.body[0];
        require('yandex-translate-api')(client.config.yandexAPIkey).translate(poke.description, { to: 'es' }, (err, res) => {
          let tipo = { Bug: '<:type_bug:611361494789259264> Bicho', Dark: '<:oscuro:611363832165695612> Oscuro', Dragon: '<:type_dragon:611364177776214016> Dragón', Electric: '<:electrico:611360852435795970> Eléctrico', Fairy: '<:hada:611365735574536206> Hada', Fighting: '<:lucha:611365076791722012> Lucha', Fire: '<:fuego:611362001125638155> Fuego', Flying: '<:volador:611364005335924752> Volador', Ghost: '<:fantasma:611360252855582730> Fantasma', Grass: '<:planta:611362167224270850> Planta', Ground: '<:tierra:611364563027230800> Tierra', Ice: '<:hielo:611366771416367105> Hielo', Normal: '<:normal:611359165901701162> Normal', Poison: '<:veneno:611360558050050059> Veneno', Psychic: '<:psychic:611365427465158686> Psíquico', Rock: '<:roca:611364775150223382> Roca', Steel: '<:acero:611366594114879542> Acero', Water: '<:agua:611366037019164684> Agua' },
            color = { Bug: 'GREEN', Dark: 'BLACK', Dragon: 'RED', Electric: '#FFD700', Fairy: '#9400D3', Fighting: '#FF391E', Fire: 'ORANGE', Flying: '#FF391E', Ghost: '#4A518D', Grass: '#00FF00', Ground: '#8B4513', Ice: '#01A9DB', Normal: '#696969', Poison: '#564471', Psychic: '#FE2E2E', Rock: '#989899', Steel: 'SLATE', Water: '#00BFFF' },
            huevo = { Bug: 'Bicho', Ditto: 'Ditto', Dragon: 'Dragon', Fairy: 'Hada', Field: 'Campo', Flying: 'Volador', Grass: 'Planta', 'Gender unknown': 'Género desconocido', 'Human-Like': 'Similar al humano', Mineral: 'Mineral', Monster: 'Monstruo', Amorphous: 'Amorfo', Undiscovered: 'No descubierto', 'Water 1': 'Agua I', 'Water 2': 'Agua II', 'Water 3': 'Agua III' };
          embed
            .setTitle(`Principal: __**${poke.name} | #${poke.number} | Generación ${poke.gen}**__`)
            .addField('Descripción:', res.text)
            .addField('Tipo:', Array.isArray(poke.types) ? poke.types.map(tipos => tipo[tipos]).join('\n ') : tipo[poke.types], true)
            .addField('Especie:', poke.species, true)
            .addField('Habilidades:', `• Normal: \`${poke.abilities.normal}\` \n• Oculta: \`${poke.abilities.hidden.length <= 0 ? 'Ninguna' : poke.abilities.hidden.join(', ')}\``, true)
            .addField('Grupos Huevos:', Array.isArray(poke.eggGroups) ? poke.eggGroups.map(huevos => huevo[huevos]).join('\n ') : huevo[poke.eggGroups], true)
            .addField('Altura y peso:', `\`${poke.height}\`/\`${poke.weight}\``, true)
            .addField('Evolución:', `${poke.family.evolutionLine.join(' ➔ ')}\nEtapa:\`${poke.family.evolutionStage}\``, true)
            .addField('Rareza:', `• Inicial: \`${poke.starter ? 'Si' : 'No'}\`\n• Legendario: \`${poke.legendary ? 'Si' : 'No'}\`\n• Mítico: \`${poke.mythical ? 'Si' : 'No'}\`\n• Ultraente: \`${poke.ultraBeast ? 'Si' : 'No'}\`\n• Mega: \`${poke.mega ? 'Si' : 'No'}\``, true)
            .setImage(poke.sprite)
            .setColor(color[Array.isArray(poke.types) ? poke.types[0] : poke.types]);
          msg.edit('** **', { embed });
        });
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
