import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// router
import { BrowserRouter } from 'react-router-dom';

// redux 상태관리 용이
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '이쁜신발', quan: 5 },
  { id: 2, name: '웃긴신발', quan: 10 },
];

function reducer(state = 초기값, 액션) {
  if (액션.type === '항목추가') {
    let copy = [...초기값];
    copy.push(액션.payload);
    return copy;
  } else if (액션.type === '수량증가') {
    let copy = [...초기값];
    copy[0].quan++;
    return copy;
  } else if (액션.type === '수량감소') {
    let copy = [...초기값];
    copy[0].quan--;
    return copy;
  } else {
    return state;
  }
}

const alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === '모달닫기') {
    return (state = false);
  } else {
    return state;
  }
}

const store = createStore(combineReducers({ reducer, reducer2 }));

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
