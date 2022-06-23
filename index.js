const { EventEmitter } = require('./EventEmitter');

const Event = {
  STEP_1: 'step_1',
  STEP_2: 'step_2',
  STEP_3: 'step_3',
  DONE: 'done',
};

const eventEmitter = new EventEmitter();

const cb = (nextEvent) => (data) => {
  console.log(data);

  setTimeout(() => {
    const nextEventData = nextEvent;
    eventEmitter.emit(nextEvent, nextEventData);
  }, 1000);
};

eventEmitter.subscribe(Event.STEP_1, cb(Event.STEP_2));
eventEmitter.subscribe(Event.STEP_2, cb(Event.STEP_3));
eventEmitter.subscribe(Event.STEP_3, cb(Event.DONE));
eventEmitter.subscribe(Event.DONE, console.log);

const data = Event.STEP_1;
eventEmitter.emit(Event.STEP_1, data);
