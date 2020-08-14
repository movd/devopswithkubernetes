import { Sequelize } from 'sequelize';

import { POSTGRES_URL } from '../setup';
import { taskFactory } from './task';

export const sequelize = new Sequelize(POSTGRES_URL, {
  logging: false,
  dialectOptions: {
    statement_timeout: 1000,
    idle_in_transaction_session_timeout: 5000,
  },
});

// Instantiate model from factory
export const Task = taskFactory(sequelize);

// Connect to database
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // dont ever do this in prod!
  } catch (error) {
    console.error('Could not connect to Database.');
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
})();
