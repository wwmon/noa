const Event = require("../event")

class Ready extends Event{
  constructor(client) {
    super(client)
  }

  async run(hook) {
    try {
      console.log(`¡Webhook listo! ${hook.path}`);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'readyDBL',
        error: e
      });
    }
  }
};

module.exports = Ready