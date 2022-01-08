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
          {props.state.map((상품, i) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{상품.id}</td>
                <td>{상품.name}</td>
                <td>{상품.quan}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

function 함수명(state) {
  return {
    state,
  };
}

export default connect(함수명)(Cart);
// export default Cart;
