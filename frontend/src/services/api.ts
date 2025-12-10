import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // backend URL
});

export const shortenUrl = (originalUrl: string) => {
    return API.post('/shorten', { originalUrl });
};

export const getStats = (shortId: string) => {
    return API.get(`/stats/${shortId}`);
};

export const deleteUrl = (shortId: string) => {
    return API.delete(`/${shortId}`);
};
