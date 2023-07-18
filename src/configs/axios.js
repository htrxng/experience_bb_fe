import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8090";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// axios.interceptors.response.use(
//     (response) => {
//         return [response.data, null];
//     },
//     (error) => {
//         return Promise.reject(error.response.data);
//     }
// );

export default axios;
