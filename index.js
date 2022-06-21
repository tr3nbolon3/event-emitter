const { EventEmitter } = require('./EventEmitter');

const Event = {
  STEP_1: 'step_1',
  STEP_2: 'step_2',
  STEP_3: 'step_3',
  DONE: 'done',
};

const eventEmitter = new EventEmitter();

const cb = (nextEvent) => (currentEvent) => {
  console.log(currentEvent);

  setTimeout(() => {
    eventEmitter.emit(nextEvent);
  }, 1000);
};

eventEmitter.on(Event.STEP_1, cb(Event.STEP_2));
eventEmitter.on(Event.STEP_2, cb(Event.STEP_3));
eventEmitter.on(Event.STEP_3, cb(Event.DONE));
eventEmitter.on(Event.DONE, console.log);

eventEmitter.emit(Event.STEP_1);
