import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품고유번호</th>
            <th>상품명</th>
            <th>상품수량</th>
          </tr>
        </thead>
        <tbody>
          {props.상품목록.map((상품, i) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{상품.id}</td>
                <td>{상품.name}</td>
                <td>{상품.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      props.dispatch({ type: '수량증가' });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      props.dispatch({ type: '수량감소' });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {props.alert열렸니 ? (
        <div className="my-alert">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({ type: '모달닫기' });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

function 함수명(state) {
  return {
    상품목록: state.reducer,
    alert열렸니: state.reducer2,
  };
}

export default connect(함수명)(Cart);
// export default Cart;
