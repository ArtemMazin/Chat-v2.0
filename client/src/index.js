import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
