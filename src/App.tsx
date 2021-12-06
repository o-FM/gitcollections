import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Rotas } from './routes';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Rotas />
      </Router>
      <GlobalStyle />
    </>
  );
};

export default App;
