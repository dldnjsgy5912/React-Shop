/*eslint-disable*/
import logo from './logo.svg';
import './App.css';
import data from './data';
import Form from 'react-bootstrap/Form';

// or less ideally
import React, { useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// component
import Navbar1 from './component/Navbar1';
import Jumbotron from './component/Jumbotron';
import Detail from './component/Detail';
import Card from './component/Card';
import Cart from './component/Cart';

// context API
export let 재고context = React.createContext();

function App() {
  const [신발들, 신발들변경] = useState(data);

  const [재고, 재고변경] = useState([10, 11, 12, 10, 11, 12]);

  const [로딩, 로딩변경] = useState(false);

  const [버튼, 버튼변경] = useState(true);

  function 정렬이벤트(e) {
    if (e.target.value == '가격낮은순') {
      let copy = [...신발들];
      copy.sort((a, b) => {
        // 오름차순
        return a.price - b.price;
      });
      신발들변경(copy);
    } else if (e.target.value == '가격높은순') {
      let copy = [...신발들];
      copy.sort((a, b) => {
        //내림차순
        return b.price - a.price;
      });
      신발들변경(copy);
    } else if (e.target.value == '이름순') {
      let copy = [...신발들];
      copy.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      신발들변경(copy);
    }
  }

  const [인풋, 인풋설정] = useState('');

  const 포커스 = useRef();

  return (
    <div className="App">
      {/* header */}
      <Navbar1></Navbar1>

      {/* main */}
      <Switch>
        <Route exact path="/">
          <Jumbotron></Jumbotron>

          <Form.Select aria-label="Default select example" onChange={정렬이벤트} className="Select">
            <option>Open this select menu</option>
            <option value="가격낮은순">가격낮은순</option>
            <option value="가격높은순">가격높은순</option>
            <option value="이름순">이름순</option>
          </Form.Select>

          <input
            type="text"
            value={인풋}
            onChange={(e) => {
              인풋설정(e.target.value);
            }}
            ref={포커스}
          />

          <button
            onClick={() => {
              인풋설정('');
              포커스.current.focus();
            }}
          >
            초기화
          </button>

          <p>결과:{인풋}</p>

          <div className="container">
            <div className="row">
              {신발들.map((신발, i) => {
                return <Card 신발들={신발들[i]} key={i} />;
              })}
            </div>

            {로딩 ? <h1>로딩중입니다</h1> : null}

            {버튼 ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  //로딩중이라는 ui 띄움
                  로딩변경(true);
                  //서버에게 보냄 ex) 로그인등
                  // axios.post('서버url', { id: 'won', pw: 123 });
                  버튼변경(false);
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((result) => {
                      //로딩중이라는 ui 안보이게 처리
                      로딩변경(false);
                      신발들변경([...신발들, ...result.data]);
                    })
                    .catch(() => {
                      //로딩중이라는 ui 안보이게 처리
                      로딩변경(false);
                      console.log('실패');
                    });
                }}
              >
                더보기
              </button>
            ) : null}
          </div>
        </Route>

        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail 신발들={신발들} 재고={재고} 재고변경={재고변경}></Detail>
          </재고context.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
