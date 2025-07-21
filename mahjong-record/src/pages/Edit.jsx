import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { RecordDispatchContext} from "../Context";
import useRecord from "../hooks/useRecord";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(RecordDispatchContext);
  const curRecordItem = useRecord(params.id);

  if (!curRecordItem) {
    return <div>해당 대국 기록을 찾을 수 없습니다.</div>;
  }

  const onClickDelete = () => {
    if (
      window.confirm("기록을 삭제하시겠습니까? 삭제된 기록은 복구가 불가능합니다.")
    ) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("기록을 수정하시겠습니까?")) {
      onUpdate(
        params.id,
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
    }
  };

  return (
    <div>
      <Header
        title={"기록 수정"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
        }
        rightChild={
          <Button
            onClick={onClickDelete}
            text={"기록 삭제"}
            type={"NEGATIVE"}
          />
        }
      />
      <Editor initData={curRecordItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
