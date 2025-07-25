import axios from 'axios';

const BASE_URL = "http://localhost:5000/game-records";

export const fetchRecords = async () => {
    try {
        const res = await axios.get(BASE_URL);
    
        return res.data;
    } catch(err) {
        if(err.response) {
            console.error("server err : ", err.response.status, err.response.data);
        } else if(err.request) {
            console.error("no response : ", err.request);
        } else {
            console.error("setup error : ", err.message);
        }

        return [];
    }
};

export const createRecord = async (data) => {
    try {
        await axios.post(BASE_URL, data);
    } catch(err) {
        if(err.response) {
            console.error("server err : ", err.response.status, err.response.data);
        } else if(err.request) {
            console.error("no response : ", err.request);
        } else {
            console.error("setup error : ", err.message);
        }
    }
};

export const updateRecord = async (id, data) => {
    try {
        await axios.put(`${BASE_URL}/${id}`, data);
    } catch(err) {
        if(err.response) {
            console.error("server err : ", err.response.status, err.response.data);
        } else if(err.request) {
            console.error("no response : ", err.request);
        } else {
            console.error("setup error : ", err.message);
        }
    }
};