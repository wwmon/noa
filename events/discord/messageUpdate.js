const Event = require("../event")

class MessageUpdate extends Event {
  constructor(client){
    super(client)
  }

  async run(oldMessage, newMessage) {
    if (oldMessage.content === newMessage.content) return;
    try {
      this.client.emit('message', newMessage);
    } catch (e) {
      this.client.err({
        type: 'event',
        name: 'messageUpdate',
        error: e
      });
    }
  }
};

module.exports = MessageUpdate