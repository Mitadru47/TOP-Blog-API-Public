import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header.jsx';
import App from './components/App.jsx';

import './styles/styles.css';

async function getProps(){

  fetch("http://localhost:3000/index", {mode: 'cors'})
    .then((response) => response.json())
    .then((responseBody) => console.log(responseBody))
    .catch((error) => console.log(error));   
} 

getProps();

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>

    <Header />
    <App />
    
  </React.StrictMode>,
);
