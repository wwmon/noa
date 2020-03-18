const Event = require('../event');

class guildDelete extends Event {
  constructor(client) {
    super(client);
  }

  async run(guild) {
    let client = this.client;
    try {
      let guildRemoveEmbed = new (require('discord.js')).MessageEmbed()
        .setColor(client.fns.selectColor('red'))
        .setThumbnail(guild.iconURL())
        .setTitle(`<:folderinvoicesv1:557682055387938837> | ${client.config.bot} fue sacada de un servidor`)
        .addField(`• Información del servidor`, `\`\`\`diff\n+ Nombre: ${guild.name}\n+ Propietario: ${guild.owner.user.tag}\n+ Server ID: ${guild.id}\n+ Miembros: ${guild.memberCount} (Humanos: ${guild.members.cache.filter(m => !m.user.bot).size})\n\`\`\``)
        .addField(`• Estadísticas de ${client.config.bot}`, `\`\`\`diff\n- Servidores: ${client.guilds.cache.size.toLocaleString()}\n- Usuarios: ${client.userCount.toLocaleString()}\n- Canales: ${client.channels.cache.size.toLocaleString()}\n- Emotes: ${client.emojis.cache.size.toLocaleString()}\n\`\`\``)
        .setTimestamp()
        .setFooter(client.config.bot, client.user.displayAvatarURL({ size: 2048 }));
      client.logs.send(guildRemoveEmbed);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'guildDelete',
        error: e
      });
    }
  }
}

module.exports = guildDelete;
