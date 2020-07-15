import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/static', express.static(`${__dirname}/public`));
app.use('/api/todos', todosRouter);

export default app;
