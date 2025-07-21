// Context.js: React Context 객체를 생성하고 내보내는 파일로 주로 js로 작성하는 것이 일반적임
import { createContext } from "react";

//DiaryStateContext는 React.createContext()로 생성된 전역 상태
export const RecordStateContext = createContext(null);
export const RecordDispatchContext = createContext(null);