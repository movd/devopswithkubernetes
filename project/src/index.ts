import http from 'http';

import app from './app';
import { PORT } from './setup';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
