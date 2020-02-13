let { Client, Collection, WebhookClient, MessageEmbed } = require('discord.js');
module.exports = class client extends Client {
  constructor(options) {
    super(options);
    /* config */
    this.config = require('../config');
    /* Bot utils */
    this.pokemon = require('./utils/pokemon');
    this.fns = new (require('./utils/functions'))(this);
    /* Discord utils */
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.afk = new Collection();
    this.logs = new WebhookClient(this.config.logs.id, this.config.logs.token);
    this.votes = new WebhookClient(this.config.votes.id, this.config.votes.token);
    /* Mongoose Models */
    this.guildsData = require('./models/Guild');
    this.membersData = require('./models/Member');
    this.usersData = require('./models/User');
  }
  /* Cargador de comandos */
  loadCommand(commandPath, commandName) {
    try {
      let props = new (require(`.${commandPath}${require('path').sep}${commandName}`))(this);
      console.log(`[C] El comando ${props.help.name} cargó con éxito`);
      props.config.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      console.error(e);
      return `[ERR] No se pudo cargar el comando: ${commandName} Error: ${e}`;
    }
  }
  /* Descarga un comando para 'relodearlo' */
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `El comando \`${commandName}\` no existe. ¡Intentalo de nuevo!`;
    if (command.shutdown) await command.shutdown(this);
    delete require.cache[require.resolve(`.${commandPath}${require('path').sep}${commandName}.js`)];
    return false;
  }
  /* Postea un error en un comando o evento */
  err(data) {
    let embed = new MessageEmbed().setColor(this.fns.selectColor('lightcolors')).setDescription(`\`\`\`js\n${data.error}\n\`\`\``);
    if (data.type === 'command') {
      data.message.channel.send(this.fns.message({ emoji: 'red', razón: `ha ocurrido un error\nPor favor repórtalo en mi servidor de soporte <https://noa.wwmon.xyz/support>`, message: data.message }));
      embed.setTitle(`\`comando\`: Error en \`${data.name}\``);
    } else if (data.type === 'event') {
      embed.setTitle(`\`evento\`: Error en \`${data.name}\``);
    }
    this.logs.send(embed);
    console.error(data.error);
  }
  /* Encuentra o crea un usuario en la base de datos */
  async findOrCreateUser(param, isLean) {
    let usersData = this.usersData;
    return new Promise(async function(resolve, reject) {
      let userData = isLean ? await usersData.findOne(param).lean() : await usersData.findOne(param);
      if (userData) {
        resolve(userData);
      } else {
        userData = new usersData(param);
        await userData.save();
        resolve(isLean ? userData.toJSON() : userData);
      }
    });
  }
  /* Encuentra o crea un miembro en la base de datos */
  async findOrCreateMember(param, isLean) {
    let membersData = this.membersData;
    let guildsData = this.guildsData;
    return new Promise(async function(resolve, reject) {
      let memberData = isLean ? await membersData.findOne(param).lean() : await membersData.findOne(param);
      if (memberData) {
        resolve(memberData);
      } else {
        memberData = new membersData(param);
        await memberData.save();
        let guild = await guildsData.findOne({ id: param.guildID });
        if (guild) {
          guild.members.push(memberData._id);
          await guild.save();
        }
        resolve(isLean ? memberData.toJSON() : memberData);
      }
    });
  }
  /* Encuentra o crea un servidor en la base de datos */
  async findOrCreateGuild(param, isLean) {
    let guildsData = this.guildsData;
    return new Promise(async function(resolve, reject) {
      let guildData = isLean
        ? await guildsData
            .findOne(param)
            .populate('members')
            .lean()
        : await guildsData.findOne(param).populate('members');
      if (guildData) {
        resolve(guildData);
      } else {
        guildData = new guildsData(param);
        await guildData.save();
        resolve(guildData.toJSON());
      }
    });
  }
};
