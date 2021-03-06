/*eslint-disable*/
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from '../App';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [알림보임, 알림보임설정] = useState(true);

  let 재고 = useContext(재고context);

  //컴포넌트가 실행되었을때 ,업데이트될때 실행
  useEffect(() => {
    let 타이머 = setTimeout(() => {
      알림보임설정(false);
    }, 2000);

    // 컴포넌트가 사라질때 실행
    return () => {
      clearTimeout(타이머);
    };
  }, []);

  let { id } = useParams();

  let history = useHistory();

  const 찾은상품 = props.신발들.find((신발) => {
    return 신발.id == id;
  });

  let [스위치, 스위치변경] = useState(false);

  const dispatch = useDispatch();

  const [현재상태, 현재상태변경] = useState('info');

  return (
    <div className="container">
      <박스>
        <제목 className="red">Detail</제목>
      </박스>

      {알림보임 ? (
        <div className="my-alert-red">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} alt="" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고} 찾은상품={찾은상품}></Info>
          <p>{재고[찾은상품.id]}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              let copy = [...props.재고];
              copy[찾은상품.id]--;
              props.재고변경(copy);

              dispatch({
                type: '항목추가',
                데이터: { id: 찾은상품.id, name: `${찾은상품.title}`, quan: 1 },
              });

              history.push('/cart');
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger "
            onClick={() => {
              history.push('/');
            }}
          >
            홈으로
          </button>
        </div>

        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link
              eventKey="link-0"
              onClick={() => {
                스위치변경(false);
                현재상태변경('info');
              }}
            >
              Active
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                스위치변경(false);
                현재상태변경('shipping');
              }}
            >
              Option 2
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={스위치} classNames="wow" timeout={500}>
          <TabContent 현재상태={현재상태} 현재상태변경={현재상태변경} 스위치변경={스위치변경}></TabContent>
        </CSSTransition>
      </div>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  return (
    <div>
      {
        {
          info: <p>첫번째 페이지</p>,
          shipping: <p>두번째 페이지</p>,
        }[props.현재상태]
      }
    </div>
  );
}

function Info(props) {
  return <p>재고 : {props.재고[props.찾은상품.id]}</p>;
}

// function 함수명(state) {
//   return {
//     상품목록: state.reducer,
//     alert열렸니: state.reducer2,
//   };
// }
// export default connect(함수명)(Detail);

export default Detail;
