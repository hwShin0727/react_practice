import Button from "./Button";
import RecordItem from "./RecordItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './RecordList.css';

const RecordList = ({ year, month, data }) => {
    const nav = useNavigate();

    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            const a_time = new Date(a.played_at).getTime();
            const b_time = new Date(b.played_at).getTime();

            if (sortType === "oldest") {
                return a_time - b_time;
            } else {
                return b_time - a_time;
            }
        });
    };

    const sortedData = getSortedData();


    return (
        <div className="RecordList">
            <div className="menu_bar">
                <select value={sortType} onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <div className="menu_bar_button_div">
                <Button
                    onClick={() => nav("/new")}
                    text={"기록 등록하기"}
                    type="primary"
                />
                <Button
                    onClick={() => nav(`/ranking/${year}/${month}`)}
                    text={"월간 랭킹 보기"}
                    type="primary"
                />
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData
                    .filter(item => !item.is_deleted)
                    .map((item) => (
                    <RecordItem key = {item.game_id} item = {item}/>
                ))}
            </div>
        </div>

    );

}

export default RecordList;