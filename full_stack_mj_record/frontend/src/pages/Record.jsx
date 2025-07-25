import {useNavigate, useParams} from "react-router-dom";

import Header from "../components/Header";
import Viewer from "../components/Viewer";
import useRecord from "../hooks/useRecord";

import { getStringedDate } from "../util/get-stringed-date";

const Record = () => {
  const nav = useNavigate();
  const params = useParams();
  const curRecordItem = useRecord(params.id);

  if (!curRecordItem) {
    return <div>데이터 로딩중...!</div>;
  }
  if(curRecordItem.is_deleted) {
    alert("존재하지 않거나 삭제된 기록입니다.");
    nav(-1, {replace : true});
  }

  const { game_id, game_type, played_at, players } = curRecordItem;

  return (
    <div>
      <Header
        title={`대국 번호 : ${game_id}번, ${game_type}, 대국 일자 : ${getStringedDate(new Date(played_at))}`}
      />
      <Viewer players = {players} />
    </div>
  );
};

export default Record;
