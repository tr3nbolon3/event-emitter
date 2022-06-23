class EventEmitter {
  constructor() {
    /**
     * @private
     */
    this.callbacksMapping = {}; // Record<eventName, cb[]>
  }

  /**
   * Add subscriber to event
   * @param {string} event event name
   * @param {Function} cb callback
   */
  subscribe(event, cb) {
    if (!this.callbacksMapping[event]) {
      this.callbacksMapping[event] = [];
    }

    this.callbacksMapping[event].push(cb);
  }

  /**
   * Remove subscriber from event
   * @param {string} event event name
   * @param {Function} cb callback
   */
  unsubscribe(event, cb) {
    if (!this.callbacksMapping[event]) {
      return;
    }
    const callbacks = this.callbacksMapping[event];
    this.callbacksMapping[event] = callbacks.filter(callback => callback !== cb);
  }

  /**
   * Emit event with data
   * @param {string} event event name
   * @param {any} data data for event
   */
  emit(event, data) {
    if (!this.callbacksMapping[event]) {
      this.callbacksMapping[event] = [];
    }

    const callbacks = this.callbacksMapping[event];
    callbacks.forEach(cb => cb(data));
  }
}

module.exports = { EventEmitter };
