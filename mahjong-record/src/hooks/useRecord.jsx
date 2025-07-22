import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecordStateContext } from "../Context";

const useRecord = (id) => {
    const data = useContext(RecordStateContext);

    const [curRecordItem, setCurRecordItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        const currentRecordItem = data.find(
            (item) => String(item.id) === String(id)
        );
        
        if (!currentRecordItem) {
            window.alert("요청하신 기록을 찾을 수 없습니다.");
            nav("/", { replace: true });
        }

        setCurRecordItem(currentRecordItem);
    }, [id, data, nav]);
    
    return curRecordItem;
}

export default useRecord;