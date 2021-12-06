import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, Issues, RepoInfo } from './style';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
}

interface GitHubIssues {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repo: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [issues, setIssues] = useState<GitHubIssues[]>([]);

  useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => setRepository(response.data));

    api
      .get(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      {repository && ( // Permite que o repositorio seja exibido apenas quando houver conteudo
        <RepoInfo>
          <header>
            <img
              src={repository?.owner.avatar_url}
              alt={repository?.owner.login}
            />
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
        </RepoInfo>
      )}
      <Issues>
        {issues.map(issues => (
          <a href={issues.html_url} key={issues.id}>
            <div>
              <strong>{issues.title}</strong>
              <p>{issues.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repo;
