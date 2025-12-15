import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001',
});


export const deleteUrl = (id: string) => {
    return API.delete(`/api/shortUrl/${id}`);
};

export const createShortUrl = (fullUrl: string, expiration: Date | null) => {
    return API.post(`/api/shortUrl`, {fullUrl, expiration});
}
export const incrementClick = (id: string) => {
    return API.post(`/api/shortUrl/click/${id}`);
};