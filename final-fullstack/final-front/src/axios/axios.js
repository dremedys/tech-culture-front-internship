import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'

const API = axios.create(
    {
        baseURL: BASE_URL
    });

API.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `JWT ${token}`
        }
        return config;
    }
    );


API.interceptors.response.use((response) => {
    return response
},
    (error) => {
        return new Promise((resolve,reject) => {
            const originalRequest = error.config
            const refreshToken = localStorage.getItem('refreshToken')
            if (error?.response?.status === 401 && !error.config._retry && refreshToken ) {
                originalRequest._retry = true
                console.log('token error')
                const response = axios.post(BASE_URL + '/auth/jwt/refresh/',{
                    refresh: refreshToken
                })
                    .then((response) => {
                        const accessToken = response.data.access
                        localStorage.setItem('token', accessToken)
                        console.log('refresh success')
                        axios.defaults.headers.common['Authorization'] ='JWT '+ accessToken;
                        return axios(originalRequest)
                })
                    .catch((err) => {
                        console.log(err)
                    })
                resolve(response)
            }
            else {
                console.log('another error')
                return reject(error)
            }
        })
    },
    )

export {API, BASE_URL}
