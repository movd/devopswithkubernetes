import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/todos', todosRouter);

app.get('/', (_req, res) => {
  res.redirect('/todos');
});

export default app;
