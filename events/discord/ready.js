module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client,
      prefix = client.config.prefix;
    try {
      let elementos = [`❤️ ~ ${client.guilds.cache.size.toLocaleString()} servidores, ${client.userCount.toLocaleString()} usuarios`, `❤️ ~ ${client.config.invite}`, `❤️ ~ ${client.config.dbl}`, `❤️ ~ ${client.config.vote}`, `❤️ ~ ${client.config.donate}`, `❓ ~ ${prefix}help`, `❓ ~ ${client.config.support}`, `❓ ~ ${client.config.github}`, '❓ ~ https://noa.wwmon.xyz', `❓ ~ v${require('../../package.json').version}`, `🦠 ~ ¡Lávate las manos con frecuencia!`, `😷 ~ Protégete a ti y a los demás`, `🏠 ~ Quédate En Casa`, `🏠 ~ #QuédateEnCasa`, `👍 ~ No seas pendejo y quedate en casa para no contagiar a tu familia y tener el maldito remordimiento de haberlos infectado :D`, `😷 ~ Mon no se baña`, `❤️ ~ Te amo Javi`, `👋 ~ Saludos a la Reina Isabel`];
      setInterval(() => {
        client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())]);
      }, 30000);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'ready',
        error: e,
      });
    }
  }
};
