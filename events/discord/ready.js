const Event = require("../event")

class Ready extends Event {
  constructor(client){
    super(client)
  }

  async run() {
    const prefix = client.config.prefix;

    try {
      /*
      * TODO: En ves de guardar la cantidad de miembros en ram, guardarlos en una base de datos.
      */
      let membersCount = 0;

      client.guilds.cache.forEach(x => {
        membersCount += x.memberCount;
      });

      client.userCount = membersCount;

      let elementos = [`❤️ ~ ${client.guilds.cache.size.toLocaleString()} servidores, ${client.userCount.toLocaleString()} usuarios`, `❤️ ~ ${client.config.invite}`, `❤️ ~ ${client.config.dbl}`, `❤️ ~ ${client.config.vote}`, `❤️ ~ ${client.config.donate}`, `❓ ~ ${prefix}help`, `❓ ~ ${client.config.support}`, `❓ ~ ${client.config.github}`, '❓ ~ https://noa.wwmon.xyz', `❓ ~ ${require('../../package.json').version}`];
      
      setInterval(() => {
        client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())]);
      }, 30000);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'ready',
        error: e
      });
    }
  }
};

module.exports = Ready