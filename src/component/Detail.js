/*eslint-disable*/
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from '../App';

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

  let 찾은상품 = props.신발들.find((신발) => {
    return 신발.id == id;
  });

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
      </div>
    </div>
  );
}

function Info(props) {
  return <p>재고 : {props.재고[props.찾은상품.id]}</p>;
}

export default Detail;