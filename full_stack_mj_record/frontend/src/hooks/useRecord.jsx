import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecordStateContext } from "../Context";

const useRecord = (game_id) => {
    const data = useContext(RecordStateContext);

    const [curRecordItem, setCurRecordItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        const currentRecordItem = data.find(
            (item) => String(item.game_id) === String(game_id) && !item.is_deleted
        );
        
        if (!currentRecordItem) {
            window.alert("요청하신 기록을 찾을 수 없습니다.");
            nav("/", { replace: true });
        }

        setCurRecordItem(currentRecordItem);
    }, [game_id, data, nav]);
    
    return curRecordItem;
}

export default useRecord;