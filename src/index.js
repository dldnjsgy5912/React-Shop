import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// router
import { BrowserRouter } from 'react-router-dom';

// redux 상태관리 용이
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(() => {
  return [
    { id: 0, name: '멋진신발', quan: 2 },
    { id: 1, name: '이쁜신발', quan: 5 },
    { id: 2, name: '웃긴신발', quan: 10 },
  ];
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
