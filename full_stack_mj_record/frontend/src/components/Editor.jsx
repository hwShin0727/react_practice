import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-date";
import "./style/Editor.css";

const seat = ["동", "남", "서", "북"];

const Editor = ({ initData, onSubmit, onDelete}) => {
  const [input, setInput] = useState({
    played_at: new Date(),
    game_type: "반장전",
    players : [
      {player_wind : "동", player_name : "", player_score : 30000},
      {player_wind : "남", player_name : "", player_score : 30000},
      {player_wind : "서", player_name : "", player_score : 30000},
      {player_wind : "북", player_name : "", player_score : 30000}
    ],
    modified_at : null,
    is_deleted : false
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        played_at : new Date(initData.played_at),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "played_at") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    const to_submit = {
      ...input,
      modified_at : new Date()
    };
    setInput(to_submit);
    onSubmit(to_submit);
  }

  const onDeleteButtonClick = () => {
    const to_delete = {
      ...input,
      modified_at : new Date(),
      is_deleted : true
    };
    setInput(to_delete);
    onDelete(to_delete);
  }

  let sum = 0;
  let check_player = false;
  const players = input.players;
  const maxIndex = players.length;

  players.forEach((player, index) => {
      sum += Number(player.player_score);
      check_player |= player.player_name === "";

      const player_seat_index = seat.indexOf(player.player_wind);

      players.slice(index + 1, maxIndex).forEach(inner_player => {
        const inner_seat_index = seat.indexOf(inner_player.player_wind);
        check_player |= 
          player.player_name === inner_player.player_name ||
          player.player_wind === inner_player.player_wind ||
          player.player_score < inner_player.player_score ||
          player.player_score == inner_player.player_score && player_seat_index >= inner_seat_index;
      });
  });
  
  sum -= 120000;
 
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>대국 일자</h4>
        <input
          name="played_at"
          onChange={onChangeInput}
          value={getStringedDate(input.played_at)}
          type="date"
        />
      </section>
      <section>
        <h4>대국 타입</h4>
        <select onChange={onChangeInput} name = "game_type" value={input.game_type}>
          <option value = "동풍전">동풍전</option>
          <option value = "반장전">반장전</option>
        </select>
      </section>
      <section className="content_section">
        <h4>대국 결과</h4>
            {input.players.map((player, index) => (
              <p key={index}>
                {index + 1}위 : {" "}
                <input
                  type="text"
                  value={player.player_name}
                  onChange={e => {
                    const updatedPlayers = [...input.players];
                    updatedPlayers[index] = {
                      ...updatedPlayers[index],
                      player_name: e.target.value
                    };
                    setInput(prev => ({ ...prev, players: updatedPlayers }));
                  }}
                />
                , 점수 : {" "}
                <input
                  type="number"
                  step="100"
                  value={player.player_score}
                  onChange={e => {
                    const updatedPlayers = [...input.players];
                    updatedPlayers[index] = {
                      ...updatedPlayers[index],
                      player_score: Number(e.target.value)
                    };
                    setInput(prev => ({ ...prev, players: updatedPlayers }));
                  }}
                />
                <select
                  value={player.player_wind}
                  onChange={e => {
                    const updatedPlayers = [...input.players];
                    updatedPlayers[index] = {
                      ...updatedPlayers[index],
                      player_wind: e.target.value
                    };
                    setInput(prev => ({ ...prev, players: updatedPlayers }));
                  }}
                >
                  {seat.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </p>
            ))}
        <p>점수 합계 : {sum}</p>
        <p style={{color: 'red'}}>{sum != 0 || check_player ? "점수 또는 대국자에 대한 입력이 잘못되었습니다." : ""}</p>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} type="secondary" text={"돌아가기"} />
        <Button onClick={onSubmitButtonClick} text={"확인"} type = "primary" disabled = {sum != 0 || check_player}/>
        <Button onClick={onDeleteButtonClick} text={"기록 삭제"} type = "danger"  disabled = {input.modified_at == null}/>        
      </section>
    </div>
  );
};

export default Editor;
