import Header from "../components/Header";
import Button from "../components/Button";
import RecordList from "../components/RecordList";

import { useContext } from "react";
import { RecordStateContext } from "../Context";
import { useParams, useNavigate } from "react-router-dom";

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
      const played_time = new Date(item.played_at).getTime();
      return !item.is_deleted && beginTime <= played_time && played_time <= endTime;
    }
  );
};

const Home = () => {
  const records = useContext(RecordStateContext);
  const nav = useNavigate();
  const params = useParams();
  const pivotDate = new Date(params.year, params.month - 1);

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