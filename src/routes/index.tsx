import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Rotas: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/repositories" element={<Repo />} />
      {/* <Navigate to="/welcome" /> */}
    </Routes>
  );
};
