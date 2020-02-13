module.exports = class Command {
  constructor(client, { name = undefined, description = 'Descripción del comando', usage = prefix => '`Uso del comando`', examples = prefix => '`Ejemplo de uso`', enabled = true, ownerOnly = false, guildOnly = false, nsfwOnly = false, voteOnly = false, cooldown = 0, aliases = [], botPermissions = [], memberPermissions = [], dirname = undefined }) {
    this.client = client;
    let category = dirname ? dirname.split(require('path').sep)[parseInt(dirname.split(require('path').sep).length - 1, 10)] : 'Otro';
    this.config = { enabled, ownerOnly, guildOnly, nsfwOnly, voteOnly, cooldown, aliases, memberPermissions, botPermissions };
    this.help = { name, description, category, usage, examples };
  }
};
