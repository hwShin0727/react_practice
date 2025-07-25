import { Routes, Route } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { RecordStateContext, RecordDispatchContext } from "./Context";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Record from "./pages/Record";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Ranking from "./pages/Ranking"
import Notfound from "./pages/Notfound";

import { createRecord, updateRecord, fetchRecords } from "./api/recordService";

const init = [];
let game_count = 0;

function reducer(state, action) {

  switch (action.type) {
    case "fetch" :
      return action.data;
    default :
      return state;
  }
}

function App() {

  const [data, dispatch] = useReducer(reducer, init);
  
  useEffect(() => {
    async function load() {
        const records = await fetchRecords();
        dispatch({type : "fetch", data : records});
        game_count = Math.max(game_count, records.length);
    }
    load();
    }, []);

  const onCreate = async (game_type, played_at, players, modified_at, is_deleted) => {
    const newData = {
        game_id : ++game_count,
        game_type : game_type,
        played_at : played_at,
        players : players,
        modified_at : modified_at,
        is_deleted : is_deleted
      };
    
      await createRecord(newData);

      const updatedData = await fetchRecords();
      
      dispatch({type : "fetch", data : updatedData});
  };

  const onUpdate = async (game_id, game_type, played_at, players, modified_at, is_deleted) => {
    const targetData = {
        game_id : game_id,
        game_type : game_type,
        played_at : played_at,
        players : players,
        modified_at : modified_at,
        is_deleted : is_deleted
    };

    await updateRecord(game_id, targetData);
    
    const updatedData = await fetchRecords();

    dispatch({type : "fetch", data : updatedData});
  };

  return (
    <>
    <RecordStateContext.Provider value = {data}> 
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
