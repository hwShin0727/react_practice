import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { RecordStateContext } from "../Context";

const sort_types = [
    "1위율", "2위율", "3위율", "4위율", "대국수"
];

const Ranking = () => {

    const nav = useNavigate();
    const params = useParams();
    const pivotDate = new Date(
            params.year,
            params.month - 1,
            1,
            0,
            0,
            0
        );

    const records = useContext(RecordStateContext);
    const [sortType, setSortType] = useState(sort_types[0]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedPlayerData = () => {
        return playerData.toSorted((a, b) => {
            switch(sortType) {
                case "1위율" :
                    return;
                case "2위율" :
                    return;
                case "3위율" :
                    return;
                case "4위율" :
                    return;
                case "대국수" :
                    return;
            }
        });
    };

    const getMonthlyData = (pivotDate, data) => {
        const beginTime = new Date(
            pivotDate.getFullYear(),
            pivotDate.getMonth(),
            1,
            0,
            0,
            0
        ).getTime();

        const endTime = new Date(
            pivotDate.getFullYear(),
            pivotDate.getMonth() + 1,
            0,
            23,
            59,
            59
        ).getTime();

        return data.filter(
            (item) => {
                const play_time = new Date(item.played_at).getTime();
                return !item.is_deleted && beginTime <= play_time && play_time <= endTime;
            }
        );
    };

    const month_records = getMonthlyData(pivotDate, records);
    // const sortedData = getSortedData();

    return (
        <>
            <Header title = {`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월 랭킹`}
            leftChild={<Button onClick={() => {
                const prevMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
                nav(`/ranking/${prevMonth.getFullYear()}/${prevMonth.getMonth() + 1}`, {replace : true});
            }} type="secondary" text={"<"} />}
            rightChild={<Button onClick={() => {
                const nextMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
                nav(`/ranking/${nextMonth.getFullYear()}/${nextMonth.getMonth() + 1}`, {replace : true});
            }} type="secondary" text={">"} />}/>
            <div className = "button_section">
                <select value = {sortType} onChange = {onChangeSortType}>
                    {
                        sort_types.map((type, index) => {
                            return <option key = {index} value = {type}>{type}</option>
                        })
                    }
                </select>
                <Button onClick = {() => nav(`/${pivotDate.getFullYear()}/${pivotDate.getMonth() + 1}`, {replace : true})} text = {"돌아가기"} type = {"secondary"}/>
            </div>
            <div className = "ranking_section">
            </div>
        </>
    );
};

export default Ranking;