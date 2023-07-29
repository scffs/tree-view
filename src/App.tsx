import React from 'react';

import Tree from './components/Tree';
import Footer from './components/Footer';

import './App.css';

const App = () => (
  <div className='wrapper'>
    <div className='box'>
      <div className='box-top'>
        <h1 className='title'>Tree</h1>
      </div>
      <div className='box-bottom'>
        <Tree />
      </div>
    </div>
    <Footer />
  </div>
);

export default App;
