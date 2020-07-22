import { Model, DataTypes, BuildOptions, Sequelize } from 'sequelize';
import { Task } from '../types';

// Create an static intersection type
type TaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Task;
};

export const taskFactory = (sequelize: Sequelize): TaskModelStatic => {
  return <TaskModelStatic>sequelize.define(
    'todos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      task: DataTypes.STRING(140),
      done: DataTypes.BOOLEAN,
    },
    {
      underscored: true,
    }
  );
};
