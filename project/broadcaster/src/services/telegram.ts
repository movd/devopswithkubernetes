import axios from 'axios';
import os from 'os';

import { TaskObj } from '../typing';
import { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID } from '../setup';

const baseUrl = `https://api.telegram.org/bot${TELEGRAM_ACCESS_TOKEN}`;

export const checkTelegramConnection = async (): Promise<boolean> => {
  // check connection to telegram
  // two conditions: sucessfull connection + check if bot is member of of chat_id
  try {
    const res = await axios.get(`${baseUrl}/getUpdates`);

    // instead of res.data.find() just squash the json response to string and check if the TELEGRAM_CHAT_ID is contained in it. typesave but ugly.

    if (!JSON.stringify(res.data).includes(TELEGRAM_CHAT_ID)) {
      console.error(
        `telegram connection error: not in chat ${TELEGRAM_CHAT_ID}`
      );

      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`telegram connection error: ${error.message}`);
    } else {
      throw error;
    }
    return false;
  }
};

export const sendMessageToTelegram = async (
  task: TaskObj,
  action: string,
  broadcaster: string
): Promise<boolean> => {
  const text = `
<b>Todos NATS Broadcaster</b>\n
A task was <i>${action}:</i>
<pre><code class="language-json-obkect">
${JSON.stringify(task, null, 2)}
</code></pre>\n
broadcasted by <code>${broadcaster}</code> @ <code>${os.hostname()}</code>
  `;

  try {
    await axios.post(`${baseUrl}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
