class EventEmitter {
  constructor() {
    this.subscribers = []; // type Array<{ event, cb }>
  }

  on(event, cb) {
    this.subscribers.push({ event, cb });
  }

  emit(event) {
    const subscribers = this.subscribers.filter(subscriber => subscriber.event === event);
    subscribers.forEach(({ event, cb }) => {
      cb(event);
    });
  }
}

module.exports = { EventEmitter };
