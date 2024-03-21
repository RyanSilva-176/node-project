import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_node",
});

//Connect
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL: ", err);
  } else {
    console.log("Conectado ao MySQL com sucesso!");
  }
});

//Get
app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.error("Erro ao buscar tarefas: ", err);
      res.status(500).send("Erro ao buscar tarefas");
    } else {
      res.json(result);
    }
  });
});

//Post
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  connection.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar tarefa: ", err);
        res.status(500).send("Erro ao criar tarefa");
      } else {
        res.status(201).send("Tarefa criada com sucesso");
      }
    }
  );
});

//Get by id
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM tasks WHERE id =?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar tarefa: ", err);
      res.status(500).send("Erro ao buscar tarefa");
    } else {
      res.json(result[0] || null);
    }
  });
});

//Put
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  connection.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar tarefa: ", err);
        res.status(500).send("Erro ao atualizar tarefa");
      } else {
        res.status(200).send("Tarefa atualizada com sucesso");
      }
    }
  );
});

//Delete
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM tasks WHERE id =?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar tarefa: ", err);
      res.status(500).send("Erro ao deletar tarefa");
    } else {
      res.status(200).send("Tarefa deletada com sucesso");
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor Express rodando na porta 3001");
});
