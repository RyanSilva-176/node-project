import express from 'express';
import cors from 'cors';
import { getTasks } from './tasks.js';
const app = express();

app.use(cors());

app.get('/tasks', (req, res) => {
  getTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      console.error('Erro ao buscar tarefas:', err);
      res.status(500).send('Erro ao buscar tarefas');
    });
});

app.listen(3001, () => {
  console.log("Servidor Express rodando na porta 3001");
});