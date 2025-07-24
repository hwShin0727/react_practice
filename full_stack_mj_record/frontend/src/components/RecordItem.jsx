import { useNavigate } from "react-router-dom";
import Button from "./Button";
import './RecordItem.css';

const RecordItem = ({ id, createdDate, gameType, eastName, eastScore, southName, southScore, westName, westScore, northName, northScore }) => {
  const nav = useNavigate();

  const goRecordPage = () => {
    nav(`/record/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="RecordItem">
      <div onClick={goRecordPage}>
        대국 번호 : {id}, 대국 타입 : {gameType}
      </div>
      <div onClick={goRecordPage} className="info_section">
        <div className="created_date">
          대국 일자 : {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">
          <p>대국 결과 :</p>
          <p>동가 : {eastName}, {eastScore}</p>
          <p>남가 : {southName}, {southScore}</p>
          <p>서가 : {westName}, {westScore}</p>
          <p>북가 : {northName}, {northScore}</p>
          </div>
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정하기"} type="primary"/>
      </div>
    </div>
  );
};

export default RecordItem;
