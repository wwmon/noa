module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'topservers',
      description: 'Muestra el top 30 servidores con más usuarios de ' + require('../../config').bot,
      usage: prefix => `\`${prefix}topservers\``,
      examples: prefix => `\`${prefix}topservers\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
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
      let top = client.guilds.cache
          .sort((a, b) => a.memberCount - b.memberCount)
          .array()
          .reverse(),
        pages = [`1. **${top[0].name}**: ${top[0].memberCount} Usuarios. (${top[0].id})\n2. **${top[1].name}**: ${top[1].memberCount} Usuarios. (${top[1].id})\n3. **${top[2].name}**: ${top[2].memberCount} Usuarios. (${top[2].id})\n4. **${top[3].name}**: ${top[3].memberCount} Usuarios. (${top[3].id})\n5. **${top[4].name}**: ${top[4].memberCount} Usuarios. (${top[4].id})\n6. **${top[5].name}**: ${top[5].memberCount} Usuarios. (${top[5].id})\n7. **${top[6].name}**: ${top[6].memberCount} Usuarios. (${top[6].id})\n8. **${top[7].name}**: ${top[7].memberCount} Usuarios. (${top[7].id})\n9. **${top[8].name}**: ${top[8].memberCount} Usuarios. (${top[8].id})\n10. **${top[9].name}**: ${top[9].memberCount} Usuarios. (${top[9].id})\n11. **${top[10].name}**: ${top[10].memberCount} Usuarios. (${top[10].id})\n12. **${top[11].name}**: ${top[11].memberCount} Usuarios. (${top[11].id})\n13. **${top[12].name}**: ${top[12].memberCount} Usuarios. (${top[12].id})\n14. **${top[13].name}**: ${top[13].memberCount} Usuarios. (${top[13].id})\n15. **${top[14].name}**: ${top[14].memberCount} Usuarios. (${top[14].id})`, `16. **${top[15].name}**: ${top[15].memberCount} Usuarios. (${top[15].id})\n17. **${top[16].name}**: ${top[16].memberCount} Usuarios. (${top[16].id})\n18. **${top[17].name}**: ${top[17].memberCount} Usuarios. (${top[17].id})\n19. **${top[18].name}**: ${top[18].memberCount} Usuarios. (${top[18].id})\n20. **${top[19].name}**: ${top[19].memberCount} Usuarios. (${top[19].id})\n21. **${top[20].name}**: ${top[20].memberCount} Usuarios. (${top[20].id})\n22. **${top[21].name}**: ${top[21].memberCount} Usuarios. (${top[21].id})\n23. **${top[22].name}**: ${top[22].memberCount} Usuarios. (${top[22].id})\n24. **${top[23].name}**: ${top[23].memberCount} Usuarios. (${top[23].id})\n25. **${top[24].name}**: ${top[24].memberCount} Usuarios. (${top[24].id})\n26. **${top[25].name}**: ${top[25].memberCount} Usuarios. (${top[25].id})\n27. **${top[26].name}**: ${top[26].memberCount} Usuarios. (${top[26].id})\n28. **${top[27].name}**: ${top[27].memberCount} Usuarios. (${top[27].id})\n29. **${top[28].name}**: ${top[28].memberCount} Usuarios. (${top[28].id})\n30. **${top[29].name}**: ${top[29].memberCount} Usuarios. (${top[29].id})`],
        page = 1;
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('➠ Top 30 servidores con más usuarios de ' + client.config.bot, client.user.avatarURL())
        .setFooter(`Página ${page} de ${pages.length}`)
        .setDescription(pages[page - 1]);
      let msg = await message.channel.send({ embed });
      msg.react('⏪');
      msg.react('⏩');
      let backwards = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id, { time: 60000 }),
        forwards = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id, { time: 60000 });
      backwards.on('collect', r => {
        if (page === 1) return;
        page--;
        embed
          .setDescription(pages[page - 1])
          .setFooter(`Página ${page} de ${pages.length}`)
          .setColor(client.fns.selectColor('lightcolors'));
        msg.edit('** **', { embed });
      });
      forwards.on('collect', r => {
        if (page === pages.length) return;
        page++;
        embed
          .setDescription(pages[page - 1])
          .setColor(client.fns.selectColor('lightcolors'))
          .setFooter(`Página ${page} de ${pages.length}`);
        msg.edit('** **', { embed });
      });
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
