import React, { useState, useEffect} from "react";
import api from "./services/api";
const { isUuid } = require("uuidv4");

import "./styles.css";

function App() {
  function validateId(request, response, next){
    const { id } = request.params;
    if(!isUuid(id)){
      return response.status(400).json({ Error : 'Incorrect ID' });
    }
    next();
  }
  app.use("/repositories/:id", validateId);

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then(response =>{
        setRepositories(response.data);
    })
  });
  
  async function handleAddRepository() {
    const response = await api.post("repositories", title, techs)
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id == id);
    if (repositoryIndex < 0 ){
      return response.status(400).json({error:'should not be able to delete a repository that does not exist'});
    }
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
