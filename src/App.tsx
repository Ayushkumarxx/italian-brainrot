import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exports from './utils/export';


const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Exports.pages.home />} />
      </Routes>
    </Router>
  );
};

export default App;


