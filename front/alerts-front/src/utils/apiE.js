import axios from "axios";

const apiE = axios.create({
    baseURL: 'https://my-json-server.typicode.com',
});

export default apiE;