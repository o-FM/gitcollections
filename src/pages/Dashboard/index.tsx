import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Form, Repos, Title } from './style';
import logo from '../../assets/logo.svg';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catalogo de Repositorios dos GitHub</Title>
      <Form>
        <input type="text" placeholder="username/repository" />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/75151975?v=4"
            alt="Repositorio"
          />
          <div>
            <strong>FM-007/todo-app</strong>
            <p>Repositorio do curso de react com redux</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
