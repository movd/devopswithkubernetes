/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stream } from 'stream';
import { Todo } from './types';

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

export const toNewTodo = (object: any): Todo => {
  return {
    todo: parseString('todo', object.todo),
  };
};
