const createEventEmitter = () => {
  const callbacksMapping = {}; // Record<eventName, cb[]>

  /**
   * Add subscriber to event
   * @param {string} event event name
   * @param {Function} cb callback
   */
  const subscribe = (event, cb) => {
    if (!callbacksMapping[event]) {
      callbacksMapping[event] = [];
    }

    callbacksMapping[event].push(cb);
  };

  /**
   * Remove subscriber from event
   * @param {string} event event name
   * @param {Function} cb callback
   */
  const unsubscribe = (event, cb) => {
    if (!callbacksMapping[event]) {
      return;
    }
    const callbacks = callbacksMapping[event];
    callbacksMapping[event] = callbacks.filter(callback => callback !== cb);
  };

  /**
   * Emit event with data
   * @param {string} event event name
   * @param {any} data data for event
   */
  const emit = (event, data) => {
    if (!callbacksMapping[event]) {
      callbacksMapping[event] = [];
    }

    const callbacks = callbacksMapping[event];
    callbacks.forEach(cb => cb(data));
  };

  return { subscribe, unsubscribe, emit };
};

module.exports = { createEventEmitter };
