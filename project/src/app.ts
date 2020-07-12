import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';

import todosRouter from './routes/todos';

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todos', todosRouter);

app.engine(
  '.hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
  })
);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.get('/', (_req, res) => {
  res.redirect('/todos');
});

export default app;
