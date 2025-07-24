import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

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

    const [records, setRecords] = useState([]);
    const [sortType, setSortType] = useState("1위율");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedPlayerData = () => {
        return playerData.toSorted((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    };

    // const getMonthlyData = (pivotDate, playerData) => {
    //     const beginTime = new Date(
    //         pivotDate.getFullYear(),
    //         pivotDate.getMonth(),
    //         1,
    //         0,
    //         0,
    //         0
    //     ).getTime();

    //     const endTime = new Date(
    //         pivotDate.getFullYear(),
    //         pivotDate.getMonth() + 1,
    //         0,
    //         23,
    //         59,
    //         59
    //     ).getTime();

    //     return data.filter(
    //         (item) =>
    //         beginTime <= item.createdDate && item.createdDate <= endTime
    //     );
    // };
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
            <div className = "ranking_section">



            </div>
            <footer className= "footer_button">
                <Button onClick = {() => nav(`/${pivotDate.getFullYear()}/${pivotDate.getMonth() + 1}`, {replace : true})} text = {"돌아가기"} type = {"secondary"}/>
            </footer>
        </>
    );
};

export default Ranking;