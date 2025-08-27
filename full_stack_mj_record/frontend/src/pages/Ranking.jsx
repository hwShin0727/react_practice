import '../components/style/Ranking.css';

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
        return playerData.sort((a, b) => {
            const _a = a[1];
            const _b = b[1];

            switch(sortType) {
                case "1위율" :
                    return _b[0] / _b[4] - _a[0] / _a[4];
                case "2위율" :
                    return _b[1] / _b[4] - _a[1] / _a[4];
                case "3위율" :
                    return _b[2] / _b[4] - _a[2] / _a[4];
                case "4위율" :
                    return _b[3] / _b[4] - _a[3] / _a[4];
                case "대국수" :
                    return _b[4] - _a[4];
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
    let map = new Map();
    
    month_records.forEach((record) => {
        const count = record.game_type === "반장전" ? 1 : 0.5;
        const players = record.players;
        
        players.forEach((player, index) => {
            let result = map.get(player.player_name);
            if(result === null || result === undefined) result = [0, 0, 0, 0, 0];
            
            result[index] += count;
            result[4] += count;
            map.set(player.player_name, result);
        });
    });
    
    let playerData = [...map];

    getSortedPlayerData();

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
            <div className = "ranking_section">
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
                <table>
                    <thead>
                        <tr>
                        <th>순위</th>
                        <th>닉네임</th>
                        <th>대국수</th>
                        <th>1위 횟수</th>
                        <th>2위 횟수</th>
                        <th>3위 횟수</th>
                        <th>4위 횟수</th>
                        <th>1위율</th>
                        <th>2위율</th>
                        <th>3위율</th>
                        <th>4위율</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerData.map(([name, stats], index) => {
                        const [first, second, third, fourth, total] = stats;
                        return (
                            <tr key={name}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{total}</td>
                            <td>{first}</td>
                            <td>{second}</td>
                            <td>{third}</td>
                            <td>{fourth}</td>
                            <td>{(first / total).toFixed(2)}</td>
                            <td>{(second / total).toFixed(2)}</td>
                            <td>{(third / total).toFixed(2)}</td>
                            <td>{(fourth / total).toFixed(2)}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Ranking;