module.exports = class Command {
  constructor(client, { name = undefined, description = undefined, usage = prefix => undefined, examples = prefix => undefined, enabled = true, ownerOnly = false, guildOnly = false, nsfwOnly = false, voteOnly = false, cooldown = 0, aliases = [], botPermissions = [], memberPermissions = [], dirname = undefined }) {
    this.client = client;
    let category = dirname ? dirname.split(this.client.sep)[parseInt(dirname.split(this.client.sep).length - 1, 10)] : 'Otro';
    this.config = { enabled, ownerOnly, guildOnly, nsfwOnly, voteOnly, cooldown, aliases, memberPermissions, botPermissions };
    this.help = { name, description, category, usage, examples };
  }
};
