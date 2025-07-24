export const getStringedDate = (targetDate) => {
    // yyyy-mm-dd
    /*
    JS의 Date 객체를 받아서 yyyy-mm-dd 형식의 문자열로 바꿔주는 함수
    */
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    //날짜와 월을 두 자릿수 문자열로 포맷팅 3 -> 03
    if (month < 10) {
        month = `0${month}`; //문자열과 변수를 합치는 문법
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};
