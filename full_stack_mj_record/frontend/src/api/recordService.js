import axios from 'axios';

const BASE_URL = "http://localhost:5000/game-records";

export const fetchRecords = async () => {
    const res = await axios.get(BASE_URL);
    return res.data; 
}

export const createRecord = (data) => axios.post(BASE_URL, data);
export const updateRecord = (id, data) => axios.put(`${BASE_URL}/${id}`, data);