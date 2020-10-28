import axios from 'axios'
import localStorage from 'localStorage'

const instance = axios.create({
    baseURL: "http://localhost:3000/"
})

// interceptors
instance.interceptors.request.use((config) => {
    let token = 'Bearer ' + JSON.parse(localStorage.getItem('token')).token
  
    let headers = { 'Authorization': token };
    config.headers = Object.assign({} , config.headers, headers);
  
    return config;
  }, (err) => {
    return Promise.reject(err);
  });

export default instance