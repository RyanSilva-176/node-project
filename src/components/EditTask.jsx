import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tasks/${id}`)
      .then((response) => {
        if (response.data && response.data.title && response.data.description) {
          setTitle(response.data.title);
          setDescription(response.data.description);
        } else {
          console.error("Tarefa não encontrada:", id);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefa:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:3001/tasks/${id}`, { title, description })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao atualizar tarefa:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Editar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Título
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Descrição
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}

export default EditTask;
