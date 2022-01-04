import { useHistory } from 'react-router-dom';

function Card(props) {
  let history = useHistory();

  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.신발들.id + 1) + '.jpg'} alt="" width="100%" />
      <h4>{props.신발들.title}</h4>

      <p>{props.신발들.content}</p>

      <p>{props.신발들.price} 원</p>

      <button
        className="btn btn-danger"
        onClick={() => {
          history.push(`/detail/${props.신발들.id}`);
        }}
      >
        주문하기
      </button>
    </div>
  );
}

export default Card;
