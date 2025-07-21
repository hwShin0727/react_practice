import Button from "./Button";
import RecordItem from "./RecordItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//일기들을 정렬 선택 메유, 새 일기 쓰기를 제공하는 컴포넌트
const RecordList = ({ data }) => {
    const nav = useNavigate();
    //sortType은 일기 정렬 기준(latest, oldest(오른차순))
    const [sortType, setSortType] = useState("latest");

    //일기 정렬
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    //정렬된 데이터 반환
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
        <div className="DiaryList">
            <div className="menu_bar">
                <select value={sortType} onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button
                    onClick={() => nav("/new")}
                    text={"기록 등록하기"}
                    type={"POSITIVE"}
                />
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => (
                    <RecordItem key={item.id} {...item} />
                ))}
            </div>
        </div>

    );

}

export default RecordList;