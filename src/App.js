import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Login, Explore } from './pages';

const client = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="/*" element={<Explore />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
