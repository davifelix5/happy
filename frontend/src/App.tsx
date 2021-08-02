import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import 'leaflet/dist/leaflet.css';

import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
