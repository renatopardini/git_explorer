import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Dash from "./styles"
import logoImg from "../../assets/logo.svg"
import { FiChevronRight } from 'react-icons/fi';

const Dashboard = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState(() => {
    const storagedRepositories = localStorage.getItem('@GithubeExplorer:repositories')

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem('@GithubeExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event) {
    event.preventDefault()

    if(!newRepo) {
      setInputError('Informe o autor/nome do repositório!')
      return
    }

    try {
      const response = await api.get(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([... repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Não encontramos nenhum repositório com este nome!')
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer"/>
      <Dash.Titulo>Explore repositórios no Github</Dash.Titulo>

      <Dash.Form hasError={ !! inputError } onSubmit={handleAddRepository}>
        <input type="text" value={newRepo} onChange={(e) => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório"/>
        <button type="submit">Pesquisar</button>
      </Dash.Form>

      { inputError && <Dash.Error>{inputError}</Dash.Error> }

      <Dash.Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
             <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}

      </Dash.Repositories>
    </>
  )
}

export default Dashboard;
