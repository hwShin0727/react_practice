import { Routes, Route } from "react-router-dom";
import { useReducer, useRef } from "react";

import { RecordStateContext, RecordDispatchContext } from "./Context";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Record from "./pages/Record";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Ranking from "./pages/Ranking"
import Notfound from "./pages/Notfound";
import { fetchRecords } from "./api/recordService";

function reducer(state, action) {

  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item);
    default:
      return state;
  }
}

function App() {

  const [data, dispatch] = useReducer(reducer, fetchRecords);
  const idRef = useRef(data.length);

  const onCreate = (game_type, played_at, players, modified_at, is_deleted) => {
    dispatch({
      type: "CREATE",
      data: {
        game_id : ++idRef.current,
        game_type : game_type,
        played_at : played_at,
        players : players,
        modified_at : modified_at,
        is_deleted : is_deleted
      },
    });
  };

  const onUpdate = (game_id, game_type, played_at, players, modified_at, is_deleted) => {
    dispatch({
      type: "UPDATE",
      data: {
        game_id : game_id,
        game_type : game_type,
        played_at : played_at,
        players : players,
        modified_at : modified_at,
        is_deleted : is_deleted
      },
    });
  };

  return (
    <>
    <RecordStateContext.Provider value={data}> 
        {/* 전역 액션 함수: 세개의 함수를 언제든 사용할 수 있도록 저장 */}
        <RecordDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
          }}> 
          <Routes>
            <Route path= "/" element = {<Index />} />
            <Route path= "/:year/:month" element = {<Home />} />
            <Route path= "/new" element = {<New />} />
            <Route path= "/record/:id" element = {<Record />} />
            <Route path= "/edit/:id" element = {<Edit />} />
            <Route path= "/ranking/:year/:month" element = {<Ranking />}/>
            <Route path= "*" element = {<Notfound />} />
          </Routes>
        </RecordDispatchContext.Provider>
      </RecordStateContext.Provider>
    </>
  );
}

export default App;
