import './Viewer.css';
import Button from './Button'
import { useParams, useNavigate } from "react-router-dom";

const Viewer = ({ content }) => {

  const params = useParams();
  const nav = useNavigate();
  
  return (
    <div className="Viewer">
      <section className="content_section">
        <h4>대국 결과</h4>
        <div className="content_wrapper">
          <p>{`동가 : ${content.eastName}, ${content.eastScore}점`}</p>
          <p>{`남가 : ${content.southName}, ${content.southScore}점`}</p>
          <p>{`서가 : ${content.westName}, ${content.westScore}점`}</p>
          <p>{`북가 : ${content.northName}, ${content.northScore}점`}</p>
          <p>{`점수 합계 : ${Number(content.eastScore) + Number(content.southScore) + Number(content.westScore) + Number(content.northScore) - 120000} 점`}</p>
        </div>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"돌아가기"} type="secondary"/>
        <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} type="primary"/>
      </section>
    </div>
  );
};

export default Viewer;
