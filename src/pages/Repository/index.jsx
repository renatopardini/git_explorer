import { useEffect, useState } from 'react'
import { useRouteMatch, Link } from "react-router-dom"
import Repo from './styles'
import api from '../../services/api'

import logoImg from "../../assets/logo.svg"
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Repository = () => {
  const [repository, setRepository] = useState(null)
  const [issues, setIssues] = useState([])

  const { params } = useRouteMatch()

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(response => {
      setRepository(response.data)
    })
    api.get(`/repos/${params.repository}/issues`).then(response => {
      setIssues(response.data)
    })
  }, [params.repository])

  return (
    <>
      <Repo.Header>
        <img src={logoImg} alt="Github Explorer"/>

        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </Repo.Header>

      { repository && (
        <Repo.Info>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </Repo.Info>
      )}

      <Repo.Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}

      </Repo.Issues>
    </>
  )
}

export default Repository;
