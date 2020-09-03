/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

// TYPES:

export interface TaskObj {
  task: string;
  done: boolean;
  id: string; // TODO: better use uuid
  userId: null;
  createdAt: string; // TODO: timestamp format
  updatedAt: string; // TODO: timestamp format
}

// TYPEGUARDS:

const isString = (text: any): text is string => {
  return typeof text == 'string' || text instanceof String;
};

export const parseString = (keyToParse: string, stringToParse: any): string => {
  if (!stringToParse || !isString(stringToParse)) {
    throw new Error(`Incorrect or missing ${keyToParse} must be a string`);
  }
  return stringToParse;
};

const isBoolean = (val: any) => Boolean(val) === val;

export const parseBoolean = (keyToParse: string, valToParse: any): boolean => {
  if (!isBoolean(valToParse)) {
    throw new Error(`Incorrect or missing '${keyToParse}' must be a boolean`);
  }

  return valToParse as boolean;
};

export const toTaskObj = (object: any): TaskObj => {
  return {
    task: parseString('task', object.task),
    // If 'done' is given run trough typeguard check otherwise set false
    done: object.done ? parseBoolean('done', object.done) : false,
    id: parseString('id', object.id),
    userId: null,
    createdAt: parseString('createdAt', object.createdAt),
    updatedAt: parseString('updatedAt', object.updatedAt),
  };
};
