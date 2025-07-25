import './style/Viewer.css';
import Button from './Button'
import { useParams, useNavigate } from "react-router-dom";

const Viewer = ({ players }) => {

  const params = useParams();
  const nav = useNavigate();
  
  let sum = 0;
  players.forEach(player => {
    sum += Number(player.player_score);
  });
  sum -= 120000;

  return (
    <div className="Viewer">
      <section className="content_section">
        <h4>대국 결과</h4>
        <div className="content_wrapper">
          {
            players.map((player, index) => {
                return <p key = {index}>{index + 1}위 : {player.player_wind}가, {player.player_name}, {player.player_score}점</p>
              }
            )
          }
          <p>{`점수 합계 : ${sum} 점`}</p>
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
