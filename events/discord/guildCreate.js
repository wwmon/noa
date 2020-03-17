const Event = require("../event")

class GuildCreate extends Event{
  constructor(client){
    super(client)
  }

  async run(guild) {
    let client = this.client;
    try {
      let newGuildEmbed = new (require('discord.js')).MessageEmbed()
        .setColor(client.fns.selectColor('green'))
        .setThumbnail(guild.iconURL())
        .setTitle(`<:folderinvoicesv1:557682055387938837> | ${client.config.bot} fue invitada a un nuevo servidor`)
        .addField(`• Información del servidor`, `\`\`\`diff\n+ Nombre: ${guild.name}\n+ Propietario: ${guild.owner.user.tag}\n+ Server ID: ${guild.id}\n+ Miembros: ${guild.memberCount} (Humanos: ${guild.members.cache.filter(m => !m.user.bot).size})\n\`\`\``)
        .addField(`• Estadísticas de ${client.config.bot}`, `\`\`\`diff\n- Servidores: ${client.guilds.cache.size.toLocaleString()}\n- Usuarios: ${client.userCount.toLocaleString()}\n- Canales: ${client.channels.cache.size.toLocaleString()}\n- Emotes: ${client.emojis.cache.size.toLocaleString()}\n\`\`\``)
        .setTimestamp()
        .setFooter(client.config.bot, client.user.displayAvatarURL({ size: 2048 }));

      client.logs.send(newGuildEmbed);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'guildCreate',
        error: e
      });
    }
  }
};

module.exports = GuildCreate