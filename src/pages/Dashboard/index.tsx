import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';

import { Erro, Form, Repos, Title } from './style';
import logo from '../../assets/logo.svg';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>(() => {
    const storageRepo = localStorage.getItem('@GitCollections:repositories');

    if (storageRepo) {
      return JSON.parse(storageRepo);
    }

    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  // Introduzindo LocalStorage
  useEffect(() => {
    localStorage.setItem('@GitCollections:repositories', JSON.stringify(repos));
  }, [repos]);

  // Metodo para capturar string do input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewRepo(event.target.value);
  };

  //Metodo para adicionar um novo repositorio a lista ...
  const handleAddRepo = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Informe um username/repositório válido');
      return;
    }

    // Tratamento de repositórios não encontrados
    try {
      const response = await api.get<GitHubRepository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Repositório não encontrado no GitHub');
    }
  };

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catalogo de Repositorios dos GitHub</Title>
      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          type="text"
          placeholder="username/repository"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Erro>{inputError}</Erro>}

      <Repos>
        {repos.map((repository, index) => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name + index}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};
