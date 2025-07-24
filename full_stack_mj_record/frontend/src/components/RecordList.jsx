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
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
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
                {sortedData.map((item) => (
                    <RecordItem id={item.id} createdDate={item.createdDate} gameType={item.gameType}
                    eastName={item.eastName} eastScore={item.eastScore}
                    southName={item.southName} southScore={item.southScore}
                    westName={item.westName} westScore={item.westScore}
                    northName={item.northName} northScore={item.northScore} />
                ))}
            </div>
        </div>

    );

}

export default RecordList;