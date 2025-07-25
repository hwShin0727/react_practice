import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext } from "react";
import { RecordDispatchContext} from "../Context";
import useRecord from "../hooks/useRecord";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate } = useContext(RecordDispatchContext);
  const curRecordItem = useRecord(params.id);

  if (!curRecordItem || curRecordItem.is_deleted) {
    return <div>해당 대국 기록을 찾을 수 없습니다.</div>;
  }

  const onClickDelete = (input) => {
    if (
      window.confirm("기록을 삭제하시겠습니까? 삭제된 기록은 복구가 불가능합니다.")
    ) {
      onUpdate(
        params.id,
        input.game_type,
        input.played_at,
        input.players,
        input.modified_at,
        input.is_deleted
      );
      nav(`/${input.played_at.getFullYear()}/${input.played_at.getMonth() + 1}`, { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("기록을 수정하시겠습니까?")) {
      onUpdate(
        params.id,
        input.game_type,
        input.played_at,
        input.players,
        input.modified_at,
        input.is_deleted
      );
      nav(`/${input.played_at.getFullYear()}/${input.played_at.getMonth() + 1}`, { replace: true });
    }
  };

  return (
    <div className="EditPageWrap">
      <Header
        title={"기록 수정"}
      />
      <Editor initData={curRecordItem} onSubmit={onSubmit} onDelete={onClickDelete} />
    </div>
  );
};

export default Edit;
