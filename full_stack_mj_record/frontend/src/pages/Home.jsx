import Header from "../components/Header";
import Button from "../components/Button";
import RecordList from "../components/RecordList";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecords } from "../api/recordService"; //데이터베이스 연동 부분

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

  console.log(data);
  console.log(data.type);

  return data.filter(
    (item) =>
      beginTime <= item.played_at && item.playet_at <= endTime
  );
};

const Home = () => {
  const nav = useNavigate();
  const params = useParams();
  const pivotDate = new Date(params.year, params.month - 1);

  //데이터베이스 연동 부분
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      setRecords(await fetchRecords());
    }
  }, []);

  //--------------------------------------
  const monthlyData = getMonthlyData(pivotDate, records);

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월 대국 기록`}
        leftChild={<Button onClick={() => {
          const prevMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
          nav(`/${prevMonth.getFullYear()}/${prevMonth.getMonth() + 1}`, {replace : true});
        }} type="secondary" text={"<"} />}
        rightChild={<Button onClick={() => {
          const nextMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
          nav(`/${nextMonth.getFullYear()}/${nextMonth.getMonth() + 1}`, {replace : true});
        }} type="secondary" text={">"} />}
      />
      <RecordList year = {params.year} month = {params.month} data={monthlyData} />
    </div>
  );
};

export default Home;