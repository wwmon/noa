const Event = require("../event")

class MessageUpdate extends Event {
  constructor(client){
    super(client)
  }

  async run(oldMessage, newMessage) {
    let client = this.client;
    if (oldMessage === newMessage) return;
    if (oldMessage.content === newMessage.content) return;
    try {
      client.emit('message', newMessage);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'messageUpdate',
        error: e
      });
    }
  }
};

module.exports = MessageUpdate