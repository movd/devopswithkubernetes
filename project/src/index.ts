import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_req, res) => {
  console.log('someone pinged me');
  res.json({ message: 'pong' });
});

app.get('/api/todos', (_req, res) => {
  console.log('someone wants to read the todos');
  res.json({
    todos: [
      'add the possibility to create, read, update and delete todos',
      'some testing',
      'user auth',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
