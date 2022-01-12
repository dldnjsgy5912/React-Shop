import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const 상품목록 = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const alert열렸니 = useSelector((state) => state.reducer2);

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
          {상품목록.map((상품, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{상품.id}</td>
                <td>{상품.name}</td>
                <td>{상품.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: '수량증가', payload: i });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: '수량감소', payload: i });
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: '항목제거', payload: i });
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {alert열렸니 && (
        <div className="my-alert">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: '모달닫기' });
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

// function 함수명(state) {
//   return {
//     상품목록: state.reducer,
//     alert열렸니: state.reducer2,
//   };
// }

// export default connect(함수명)(Cart);
export default Cart;
