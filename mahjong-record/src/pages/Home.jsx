import Header from "../components/Header";
import Button from "../components/Button";
import RecordList from "../components/RecordList";
import { useState, useContext, useEffect } from "react";
import { RecordStateContext } from "../Context";
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

  return data.filter(
    (item) =>
      beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(RecordStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  //데이터베이스 연동 부분
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords()
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);
  //--------------------------------------
  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };

  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${
          pivotDate.getMonth() + 1
        }월 대국 기록`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <RecordList data={monthlyData} />
      {/* 데이터베이스 연동 부분 */}
      
      <h2>대국기록 목록</h2>
      {records.map(d => (
        <div key={d.id}>{d.createdDate}</div>
      ))}

    </div>
  );
};

export default Home;