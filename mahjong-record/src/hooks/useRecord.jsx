import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecordStateContext } from "../Context";

// 커스텀 훅: 특정 id에 해단하는 일기 데이터를 찾아 반환하는 로직
/*
1. id 전달받음
2. DiaryStateContext에서 전체 일기 목록을 불러옴
3. 해당 id에 일기를 찾아서 반환
4. 일기가 없으면 경고창을 띄우고 /로 이동
*/

const useRecord = (id) => {
    const data = useContext(RecordStateContext); //전체 일기 배열
    //[현재 id에 해당하는,  일기 설정]
    const [curRecordItem, setCurRecordItem] = useState(); //if
    const nav = useNavigate(); //받은 페이지로 이동

    useEffect(() => {
        //id에 해당하는 일기를 data에서 find()로 검색
        const currentRecordItem = data.find(
            //1=="1" 숫자와 문자 비교시 타입 자동변화
            (item) => String(item.id) === String(id)
        );
        
        //일기를 못찾은 경우
        if (!currentRecordItem) {
            window.alert("요청하신 기록을 찾을 수 없습니다.");
            nav("/", { replace: true });
        }

        //일기를 찾은 경우 상태를 리턴
        setCurRecordItem(currentRecordItem);
    }, [id, data, nav]); //일기 id가 바뀌거나, 전체목록이 바뀌거나, 페이지가 이동될때 자동 실행
    
    return curRecordItem;
}

export default useRecord;