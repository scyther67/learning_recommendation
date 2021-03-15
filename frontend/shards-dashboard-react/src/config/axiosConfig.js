import axios from "axios";

const instance = axios.create({
  baseURL: "https://sqlrecommender.southeastasia.cloudapp.azure.com"
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "user_token"
);

instance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
