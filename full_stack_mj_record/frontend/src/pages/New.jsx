import Header from "../components/Header";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecordDispatchContext } from "../Context";

const New = () => {
  const { onCreate } = useContext(RecordDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.game_type,
      input.played_at,
      input.players,
      input.modified_at,
      input.is_deleted,
    );
    nav(`/${input.played_at.getFullYear()}/${input.played_at.getMonth() + 1}`, { replace: true });
  };

  return (
    <div>
      <Header title={"기록 등록"} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
