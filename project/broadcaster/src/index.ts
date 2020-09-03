import { NATS_URL } from './setup';
import { TaskObj, toTaskObj } from './typing';
import { generateName } from './services/name';
import {
  checkTelegramConnection,
  sendMessageToTelegram,
} from './services/telegram';

import { connect, Payload } from 'ts-nats';

const broadcaster = generateName();

const subscribeToNATS = async (): Promise<void> => {
  const nc = await connect({
    url: NATS_URL,
    payload: Payload.JSON,
  });

  //TODO: this could be less verbose....

  void nc.subscribe(
    'todos.created',
    (err, msg) => {
      if (err) {
        console.log('error', err);
      } else {
        void broadcast(toTaskObj(msg.data), 'created');
      }
    },
    { queue: 'todos_broadcasters' }
  );

  void nc.subscribe(
    'todos.updated',
    (err, msg) => {
      if (err) {
        console.log('error', err);
      } else {
        void broadcast(toTaskObj(msg.data), 'updated');
      }
    },
    { queue: 'todos_broadcasters' }
  );

  void nc.subscribe(
    'todos.deleted',
    (err, msg) => {
      if (err) {
        console.log('error', err);
      } else {
        void broadcast(toTaskObj(msg.data), 'deleted');
      }
    },
    { queue: 'todos_broadcasters' }
  );
  console.log(`${broadcaster} standing by on ${NATS_URL}`);
  nc.publish('todos.broadcast', { status: `${broadcaster} standing by...` });
};
const broadcast = async (task: TaskObj, action: string): Promise<void> => {
  console.log(task);
  const nc = await connect({
    url: NATS_URL,
    payload: Payload.JSON,
  });

  await sendMessageToTelegram(task, action, broadcaster);
  nc.publish('todos.broadcast', {
    status: `${broadcaster} sent a broadcast because of a ${action} task.`,
  });
  await nc.flush();
  nc.close();
  console.log('send from', broadcaster);
};

(async () => {
  try {
    const telegramStatus = await checkTelegramConnection();
    if (!telegramStatus) {
      process.exit(1);
    }
    await subscribeToNATS();
  } catch (error) {
    console.error(error);
  }
})();
