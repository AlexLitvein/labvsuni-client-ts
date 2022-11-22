import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import App from './App';
import './index.css';
import { myTheme } from './mui/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={myTheme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
