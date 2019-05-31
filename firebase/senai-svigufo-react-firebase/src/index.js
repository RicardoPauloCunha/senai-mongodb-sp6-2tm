import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EventoIndex from './pages/eventos/index';
import * as serviceWorker from './serviceWorker';

// import './assents/css/flexbox.css';
// import './assents/css/reset.css';
// import './assents/css/style.css';


ReactDOM.render(<EventoIndex />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
