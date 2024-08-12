// src/App.jsx
import React from 'react';
import Flash from './components/Flash';
import Dash from './components/Dash';
import Useflip from './hooks/Useflip';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path ="/" element = {<Flash />}/>
          <Route path ="/bar" element = {<Dash />}/>
        </Routes>
      
    </div>
    </Router>
    
  );
};

export default App;
