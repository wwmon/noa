const Event = require("../event")

class Vote extends Event{
  constructor(client) {
    this.client = client;
  }
  async run(vote) {
    let client = this.client;
    try {
      let user = await client.users.fetch(vote.user),
        bot = await client.users.fetch(vote.bot),
        uwu = await client.dbl.getBot(client.config.botID),
        embed = new (require('discord.js').MessageEmbed)()
          .setColor(client.fns.selectColor('lightcolors'))
          .setThumbnail(user.displayAvatarURL())
          .setTitle('<:upvote:651571911632879626> | ¡Un usuario ha votado por ' + bot.username + '!')
          .setDescription('¡Tú también vota por ' + bot.username + ' [haciendo clic aquí](https://top.gg/bot/' + bot.id + '/vote)!')
          .addField('• Usuario', `~ Tag: **${user.tag}**\n~ ID: **${user.id}**`)
          .addField('• Total de votos', `~ Este mes: **${uwu.monthlyPoints}**\n~ Desde siempre: **${uwu.points}**`)
          .setTimestamp();
      if (client.dbl.isWeekend() === true) embed.addField('• Multiplicador', '¡Fin de semana, tu voto cuenta x2!');
      if (vote.type === 'test') embed.setFooter('(Voto de prueba)');
      client.votes.send(embed);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'voteDBL',
        error: e
      });
    }
  }
};

module.exports = Vote