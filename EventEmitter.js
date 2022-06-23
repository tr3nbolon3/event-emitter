class EventEmitter {
  constructor() {
    this.callbacksMapping = {}; // Record<eventName, cb[]>
  }

  subscribe(event, cb) {
    if (!this.callbacksMapping[event]) {
      this.callbacksMapping[event] = [];
    }

    this.callbacksMapping[event].push(cb);
  }

  unsubscribe(event, cb) {
    if (!this.callbacksMapping[event]) {
      return;
    }
    const callbacks = this.callbacksMapping[event];
    this.callbacksMapping[event] = callbacks.filter(callback => callback !== cb);
  }

  emit(event, data) {
    if (!this.callbacksMapping[event]) {
      this.callbacksMapping[event] = [];
    }

    const callbacks = this.callbacksMapping[event];
    callbacks.forEach(cb => cb(data));
  }
}

module.exports = { EventEmitter };
