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

const 초기값 = [];

function reducer(state = 초기값, 액션) {
  if (액션.type === '항목추가') {
    let found = state.findIndex((상품) => {
      return 상품.id === 액션.데이터.id;
    });

    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(액션.데이터);
      return copy;
    }
  } else if (액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === '수량감소') {
    let copy = [...state];
    copy[액션.payload].quan--;
    return copy;
  } else if (액션.type === '항목제거') {
    let copy = [...state];
    copy.splice(액션.payload, 1);
    return copy;
  } else {
    return state;
  }
}

const alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  switch (액션.type) {
    case '모달닫기':
      return (state = false);
    default:
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
