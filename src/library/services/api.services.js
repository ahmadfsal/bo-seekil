import axios from 'axios';
import { TOKEN } from '@constants/auth.constant';

export const seekilApi = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
});