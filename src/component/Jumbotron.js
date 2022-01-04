import { Button } from 'react-bootstrap';

function Jumbotron() {
  return (
    <div className="Jumbotron">
      <div className="bg"></div>
      <div className="text">
        <h1>20% SALE</h1>
        <p>
          나이키 는 운동선수들을 위한 스포츠 의류 기업이다. 나이키는 그리스 신화에서 승리의 신인 니케를 영어로 말한 것을 뜻하며, 현재까지 사용되는 로고는 디자인을 공부하던 학생인 캐롤린 데이비슨이
          육상트랙을 역동적으로 형상화한 것이다.
        </p>
        <Button variant="primary">Primary</Button>
      </div>
    </div>
  );
}

export default Jumbotron;
