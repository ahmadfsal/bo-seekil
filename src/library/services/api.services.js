import axios from 'axios';
import { TOKEN } from '@constants/auth.constant';

const dev = 'http://127.0.0.1:8080/';
const prod = 'https://glacial-journey-79187.herokuapp.com/';

export const seekilApi = axios.create({
    baseURL: dev,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
});
