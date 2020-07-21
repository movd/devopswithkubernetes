/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stream } from 'stream';
import { Task } from './types';

export const parseDownloadedImage = (fileToParse: any): Stream => {
  if (!fileToParse || !fileToParse.rawHeaders.includes('image/jpeg')) {
    throw new Error(`error: missing ${fileToParse as string} or not an image`);
  }
  return fileToParse as Stream;
};

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

const isNumber = (num: any): num is number => {
  return typeof num == 'number' || num instanceof Number || !isNaN(num);
};

export const parseNumber = (keyToParse: string, numToParse: any): number => {
  if (!numToParse || !isNumber(numToParse)) {
    throw new Error(
      `Incorrect or missing ${keyToParse} must be a number: ${
        numToParse as number
      }`
    );
  }

  // only allow integers
  if (!Number.isInteger(Number(numToParse)) || !(Number(numToParse) > 0)) {
    throw new Error(
      `Incorrect or missing ${keyToParse} must be positive integer: ${numToParse}`
    );
  }
  return Number(numToParse);
};

export const toNewTask = (object: any): Task => {
  return {
    task: parseString('task', object.task),
    // If 'done' is given run trough typeguard check otherwise set false
    done: object.done ? parseBoolean('done', object.done) : false,
    id: parseNumber('id', object.id),
  };
};

export const toSingleTask = (object: any): Omit<Task, 'task' | 'done'> => {
  const id = parseNumber('id', object.id);
  return {
    id,
  };
};
