import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/records";
const RANK_URL = "http://localhost:8080/api/ranking";

export const fetchRecords = () => axios.get(BASE_URL);
export const fetchRecordById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createRecord = (data) => axios.post(BASE_URL, data);
export const updateRecord = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteRecord = (id) => axios.delete(`${BASE_URL}/${id}`);

export const showRanking = () => axios.get(RANK_URL);
export const showRankingByMonth = (month) => axios.get(`${RANK_URL}/${month}`);