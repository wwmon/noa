module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'weather',
      description: 'Revisa el clima de algún lugar del mundo',
      usage: prefix => `\`${prefix}weather <zona>\``,
      examples: prefix => `\`${prefix}weather Los Ángeles\``,
      enabled: true,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe una ciudad para obtener su clima', usage: this.help.usage(message.prefix), message }));
      else {
        require('weather-js').find({ search: args.join(' '), degreeType: 'C' }, (err, result) => {
          if (err) message.channel.send(err);
          if (result === undefined || result.length === 0) message.channel.send(client.message({ emoji: 'red', razón: 'debes ingresar un lugar válido', usage: this.help.usage(message.prefix), message }));
          else {
            let current = result[0].current,
              location = result[0].location;
            embed
              .setDescription(`**${current.skytext}**`)
              .setAuthor(`Clima de ${current.observationpoint}`)
              .setThumbnail(current.imageUrl)
              .setColor(client.fns.selectColor('lightcolors'))
              .addField('Coordenadas', `${location.lat}, ${location.long}`, true)
              .addField('Zona horaria', `UTC${location.timezone}`, true)
              .addField('Hora', `${current.observationtime}`, true)
              .addField('Tipo de Grado', 'Grado Celsius (ºC)', true)
              .addField('Temperatura', `${current.temperature} ºC`, true)
              .addField('Se siente como', `${current.feelslike} ºC`, true)
              .addField('Vientos', current.winddisplay, true)
              .addField('Húmedad', `${current.humidity}%`, true);
            message.channel.send({ embed });
          }
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
