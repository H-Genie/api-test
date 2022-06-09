import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PaginationProvider } from './context/PaginationContext'

ReactDOM.render(
  <PaginationProvider>
    <App />
  </PaginationProvider>,
  document.getElementById('root')
);