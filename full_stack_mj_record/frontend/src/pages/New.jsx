import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecordDispatchContext } from "../Context";

const New = () => {
  const { onCreate } = useContext(RecordDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.gameType,
      input.eastName,
      input.eastScore,
      input.southName,
      input.southScore,
      input.westName,
      input.westScore,
      input.northName,
      input.northScore
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"기록 등록하기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} type="secondary"/>
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
