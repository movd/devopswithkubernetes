import { NATS_URL } from '../setup';
import { Task } from '../types';
import { connect, Payload } from 'ts-nats';

// TODO: add strong typing and remove type assertions
export const sendTaskToNATS = async (
  action: 'created' | 'updated' | 'deleted',
  task?: unknown
): Promise<void> => {
  try {
    const nc = await connect({
      url: NATS_URL,
      payload: Payload.JSON,
    });

    const updatedTask = task as Task;
    nc.publish(`todos.${action}`, updatedTask);

    await nc.flush();

    nc.close();
  } catch (error) {
    if (error instanceof Error) {
      console.error('NATS error:', error.message);
    } else {
      throw error;
    }
  }
};
