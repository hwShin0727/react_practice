import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useRecord from "../hooks/useRecord";
import { getStringedDate } from "../util/get-stringed-date";

const Record = () => {
  const params = useParams();
  const nav = useNavigate();

  const curRecordItem = useRecord(params.id);

  if (!curRecordItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { id, createdDate, gameType, eastName, eastScore, southName, southScore, westName, westScore, northName, northScore } = curRecordItem;
  const playDate = getStringedDate(new Date(createdDate));
  const content = {
    eastName: eastName,
    eastScore: eastScore,
    southName: southName,
    southScore: southScore,
    westName: westName,
    westScore: westScore,
    northName: northName,
    northScore: northScore,
  };

  return (
    <div>
      <Header
        title={`대국 번호 : ${id}번, 대국 일자 : ${playDate}, ${gameType}`}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} type="secondary"/>
        }
        rightChild={
          <Button
            onClick={() => nav(`/edit/${params.id}`)}
            text={"기록 수정하기"}
            type="primary"
          />
        }
      />
      <Viewer content={content} />
    </div>
  );
};

export default Record;
