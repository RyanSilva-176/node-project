import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
  connection.query("CREATE DATABASE IF NOT EXISTS db_node", (err, result) => {
    if (err) throw err;
    result
      ? console.log("Banco de dados criado ou já existente")
      : console.log("Banco de dados não criado");
  });

  connection.query("USE db_node", (err, result) => {
    if (err) throw err;
    result
      ? console.log("Banco de dados selecionado")
      : console.log("Banco de dados não selecionado");
  });

  connection.query(
    "CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description VARCHAR(255));",
    (err, result) => {
      if (err) throw err;
      result
        ? console.log("Tabela criada ou já existente")
        : console.log("Tabela não criada");
    }
  );
  connection.end();
});
