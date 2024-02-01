import React from 'react';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';

import Home from '../../pages/home/home';
import Topic from '../../pages/topic/topic';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topic/:id" element={<Topic />} />
    </Routes>
  );
}

export default App;
