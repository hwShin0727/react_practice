import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    gameType: "반장전",
    eastName: "", eastScore: 30000,
    southName: "", southScore: 30000,
    westName: "", westScore: 30000,
    northName: "", northScore: 30000,
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  const scoreSum = Number(input.eastScore) + Number(input.southScore) + Number(input.westScore) + Number(input.northScore) - 120000;
  
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>대국 일자</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section>
        <h4>대국 타입</h4>
        <select onChange={onChangeInput} value={input.gameType}>
          <option value = "동풍전">동풍전</option>
          <option value = "반장전">반장전</option>
        </select>
      </section>
      <section className="content_section">
        <h4>대국 결과</h4>
        <p>동가 : <input type = "text" value = {input.eastName} name="eastName" onChange={onChangeInput}/>, 
        점수 : <input type = "number" step="1" value = {input.eastScore} name = "eastScore" onChange={onChangeInput}/></p>
        <p>남가 : <input type = "text" value = {input.southName} name="southName" onChange={onChangeInput}/>, 
        점수 : <input type = "number" step="1" value = {input.southScore} name = "southScore" onChange={onChangeInput}/></p> 
        <p>서가 : <input type = "text" value = {input.westName} name="westName" onChange={onChangeInput}/>, 
        점수 : <input type = "number" step="1" value = {input.westScore} name = "westScore" onChange={onChangeInput}/></p> 
        <p>북가 : <input type = "text" value = {input.northName} name="northName" onChange={onChangeInput}/>, 
        점수 : <input type = "number" step="1" value = {input.northScore} name = "northScore" onChange={onChangeInput}/></p> 
        <p>점수 합계 : {scoreSum}</p>
        <p style={{color: 'red'}}>{scoreSum != 0 ? " 점수 합계가 맞지 않습니다." : ""}</p>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onSubmitButtonClick}
          text={"기록 등록"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
