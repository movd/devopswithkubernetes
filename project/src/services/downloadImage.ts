import fs from 'fs';
import fsPromises from 'fs/promises';
import axios from 'axios';

import { parseDownloadedImage } from '../typeguards';

export const downloadImage = async (
  url: string,
  downloadPath: string
): Promise<void> => {
  try {
    const res = await axios.get(url, { responseType: 'stream' });
    parseDownloadedImage(res.data).pipe(
      fs.createWriteStream(`${downloadPath}/image.jpg`)
    );
    console.log(`downloaded a image from ${url} to ${downloadPath}/image.jpg`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error('something went wrong');
    }
  }
};

export const ImageExists = async (downloadPath: string): Promise<boolean> => {
  // console.log(path);
  try {
    await fsPromises.stat(`${downloadPath}/image.jpg`);
    console.log(`${downloadPath}/image.jpg already exists`);
    return true;
  } catch (error) {
    console.log(`${downloadPath}/image.jpg does not exist`);
    return false;
  }
};
