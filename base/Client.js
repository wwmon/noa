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
      props.config.location = commandPath;
      if (props.init) props.init(this);
      this.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => this.aliases.set(alias, props.help.name));
      return `Comando ${props.help.name} cargado`;
    } catch (e) {
      console.error(e);
      return `Error cargando comando ${commandName}`;
    }
  }
  /* Descarga un comando para 'relodearlo' */
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) command = this.commands.get(commandName);
    else if (this.aliases.has(commandName)) command = this.commands.get(this.aliases.get(commandName));
    if (command.shutdown) await command.shutdown(this);
    delete require.cache[require.resolve(`.${commandPath}${require('path').sep}${commandName}.js`)];
    return false;
  }
  /* Postea un error en un comando o evento */
  err(data) {
    let embed = new MessageEmbed().setColor(this.fns.selectColor('lightcolors')).setDescription(`\`\`\`js\n${data.error}\n\`\`\``);
    if (data.type === 'command') {
      data.message.channel.send(this.message({ emoji: 'red', razón: `ha ocurrido un error\nPor favor repórtalo en mi servidor de soporte <https://noa.wwmon.xyz/support>`, message: data.message }));
      embed.setTitle(`\`comando\`: Error en \`${data.name}\``);
    } else if (data.type === 'event') {
      embed.setTitle(`\`evento\`: Error en \`${data.name}\``);
    }
    this.logs.send(embed);
    console.error(data.error);
  }
  message(data) {
    /*
    client.message({ emoji: 'green|gray|red', razón: 'noargs|message', usage: this.help.usage(message.prefix), message })
    no args
    client.message({ emoji: 'red', razón: 'noargs', usage: this.help.usage(message.prefix), message })
    */
    let message = data.message,
      emoji = data.emoji,
      razón = data.razón,
      s = '',
      noargs = ['faltan argumentos', 'parece que te faltan palabras', 'creo que se te han perdido argumentos'];
    emoji = emoji.toLowerCase();
    razón = razón.split(/ +/g);
    if (emoji === 'green') s += '<:au_MiscGreenTick:599396703732498452>';
    else if (emoji === 'gray') s += '<:au_MiscGrayTick:599396703774310419>';
    else if (emoji === 'red') s += '<:au_MiscRedTick:599396704193740838>';
    else if (emoji === 'heart') s += ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'][Math.floor(Math.random() * 16)];
    else if (emoji === 'noidea') s += ['🥴', '😕', '🙄'][Math.floor(Math.random() * 3)];
    else if (emoji === 'sad') s += ['😞', '😔', '😟', '🙁', '😣', '😫', '😦', '😧', '😪'][Math.floor(Math.random() * 9)];
    else s += emoji;
    s += ' ~ **' + message.author.username + '**, ';
    if (razón[0].toLowerCase() === 'noargs') {
      return (s += (razón[1] ? razón.slice(1).join(' ') + '\n' : noargs[Math.floor(Math.random() * noargs.length)] + '\n') + '> **Uso:** ' + data.usage);
    } else return (s += razón.join(' '));
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
