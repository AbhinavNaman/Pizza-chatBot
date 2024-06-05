// src/App.jsx
import React from 'react';
import ChatInput from './components/ChatInput';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="mx-32 m-10 font-sans ">
      <ChatInput />
    </div>
    </>
  );
};

export default App;

