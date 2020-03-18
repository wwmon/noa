const Event = require('../event');

class Ready extends Event {
  constructor(client) {
    super(client);
  }

  async run() {
    const prefix = this.client.config.prefix;

    try {
      /*
       * TODO: En lugar de guardar la cantidad de miembros en memoria, guardarlos en una base de datos.
       */
      let membersCount = 0;

      this.client.guilds.cache.forEach(x => {
        membersCount += x.memberCount;
      });

      this.client.userCount = membersCount;

      let elementos = [`❤️ ~ ${this.client.guilds.cache.size.toLocaleString()} servidores, ${this.client.userCount.toLocaleString()} usuarios`, `❤️ ~ ${this.client.config.invite}`, `❤️ ~ ${this.client.config.dbl}`, `❤️ ~ ${this.client.config.vote}`, `❤️ ~ ${this.client.config.donate}`, `❓ ~ ${prefix}help`, `❓ ~ ${this.client.config.support}`, `❓ ~ ${this.client.config.github}`, '❓ ~ https://noa.wwmon.xyz', `❓ ~ ${require('../../package.json').version}`];

      setInterval(() => {
        this.client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())]);
      }, 30000);
    } catch (e) {
      this.client.err({
        type: 'event',
        name: 'ready',
        error: e
      });
    }
  }
}

module.exports = Ready;
