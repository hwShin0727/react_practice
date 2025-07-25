import { useNavigate } from "react-router-dom";
import Button from "./Button";
import './style/RecordItem.css';

const RecordItem = ({item}) => {
  const nav = useNavigate();
  const {game_id, game_type, played_at, players} = item;

  const goRecordPage = () => {
    nav(`/record/${game_id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${game_id}`);
  };

  return (
    <div className="RecordItem">
      <div onClick={goRecordPage}>
        대국 번호 : {game_id}, 대국 타입 : {game_type}
      </div>
      <div onClick={goRecordPage} className="info_section">
        <div className="created_date">
          대국 일자 : {new Date(played_at).toLocaleDateString()}
        </div>
        <div className="content">
          <p>대국 결과 :</p>
            {players.map((player, index) => (
              <p key={index}>
                {index + 1}위 : {player.player_wind}가, {player.player_name}, {player.player_score}점
              </p>
            ))}     
        </div>
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정하기"} type="primary"/>
      </div>
    </div>
  );
};

export default RecordItem;
