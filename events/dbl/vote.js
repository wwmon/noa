const discordjs = require('discord.js');

const Event = require('../event');

class Vote extends Event {
  constructor(client) {
    super(client);
  }

  async run(vote) {
    try {
      const user = await this.client.users.fetch(vote.user),
        bot = await this.client.users.fetch(vote.bot),
        uwu = await this.client.dbl.getBot(this.client.config.botID), // TODO: Ponerle un nombre más descriptivo.
        userVotedEmbed = new discordjs.MessageEmbed()
          .setColor(this.client.fns.selectColor('lightcolors'))
          .setThumbnail(user.displayAvatarURL())
          .setTitle('<:upvote:651571911632879626> | ¡Un usuario ha votado por ' + bot.username + '!')
          .setDescription('¡Tú también vota por ' + bot.username + ' [haciendo clic aquí](https://top.gg/bot/' + bot.id + '/vote)!')
          .addField('• Usuario', `~ Tag: **${user.tag}**\n~ ID: **${user.id}**`)
          .addField('• Total de votos', `~ Este mes: **${uwu.monthlyPoints}**\n~ Desde siempre: **${uwu.points}**`)
          .setTimestamp();

      if (this.client.dbl.isWeekend() === true) userVotedEmbed.addField('• Multiplicador', '¡Fin de semana, tu voto cuenta x2!');
      if (vote.type === 'test') userVotedEmbed.setFooter('(Voto de prueba)');
      this.client.votes.send(userVotedEmbed);
    } catch (e) {
      this.client.err({
        type: 'event',
        name: 'voteDBL',
        error: e
      });
    }
  }
}

module.exports = Vote;
