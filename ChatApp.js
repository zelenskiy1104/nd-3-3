const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }

  // добавим метод close()
  close() {
      this.emit('closed');
      this.removeAllListeners();
  }
}

module.exports = ChatApp;
