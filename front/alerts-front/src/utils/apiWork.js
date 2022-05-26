import axios from "axios";

const apiWprk = axios.create({
    baseURL: 'https://graph.facebook.com/v11.0/me',
});

export default apiWprk;