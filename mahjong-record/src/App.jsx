import { useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { RecordStateContext, RecordDispatchContext } from "./Context";
import Home from "./pages/Home";
import Record from "./pages/Record";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-06-10").getTime(),
    gameType: "동풍전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
  {
    id: 2,
    createdDate: new Date("2025-07-01").getTime(),
    gameType: "반장전",
    eastName: "A", eastScore: 15000,
    southName: "B", southScore: -7000,
    westName: "C", westScore: 62000,
    northName: "D", northScore: -50000,
  },
  {
    id: 3,
    createdDate: new Date("2025-07-02").getTime(),
    gameType: "반장전",
    eastName: "A", eastScore: 20000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 40000,
    northName: "D", northScore: 30000,
  },
  {
    id: 4,
    createdDate: new Date("2025-05-03").getTime(),
    gameType: "동풍전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
  {
    id: 5,
    createdDate: new Date("2025-05-02").getTime(),
    gameType: "동풍전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
  {
    id: 6,
    createdDate: new Date("2025-07-01").getTime(),
    gameType: "반장전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
  {
    id: 7,
    createdDate: new Date("2025-07-20").getTime(),
    gameType: "동풍전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
  {
    id: 8,
    createdDate: new Date("2025-06-15").getTime(),
    gameType: "반장전",
    eastName: "A", eastScore: 30000,
    southName: "B", southScore: 30000,
    westName: "C", westScore: 30000,
    northName: "D", northScore: 30000,
  },
];

function reducer(state, action) {

  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item);
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(9);

  // 새로운 일기 추가
  const onCreate = (createdDate, gameType, eastName, eastScore, southName, southScore,
    westName, westScore, northName, northScore
  ) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        gameType,
        eastName,
        eastScore,
        southName,
        southScore,
        westName,
        westScore,
        northName,
        northScore
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, gameType, eastName, eastScore, southName, southScore,
    westName, westScore, northName, northScore
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        gameType,
        eastName,
        eastScore,
        southName,
        southScore,
        westName,
        westScore,
        northName,
        northScore
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      {/* data는 useReducer로 관리되는 일기 리스트 상태 이것을 모든 컴포넌트에게 전달하는 역할을 Provider가 함 */}
      <RecordStateContext.Provider value={data}> 
        {/* 전역 액션 함수: 세개의 함수를 언제든 사용할 수 있도록 저장 */}
        <RecordDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        > 
        {/* SPA(Single Page Application) 지원*/}
        {/* Routes는 URL역할 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/record/:id" element={<Record />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </RecordDispatchContext.Provider>
      </RecordStateContext.Provider>
    </>
  );
}

export default App;
