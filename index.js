const { EventEmitter } = require('./EventEmitter');
const { createEventEmitter } = require('./event-emitter');

const Event = {
  STEP_1: 'step_1',
  STEP_2: 'step_2',
  STEP_3: 'step_3',
  DONE: 'done',
};

const run = (eventEmitter) => {
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
};

const onClassEventEmitter = new EventEmitter();
const onFuncsEventEmitter = createEventEmitter();

run(onClassEventEmitter);
onClassEventEmitter.subscribe(Event.DONE, () => {
  run(onFuncsEventEmitter);
});
