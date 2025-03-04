import axios from "axios"
import { decodeToken } from "../utils/auth";



const navigateToLogin = () => {
    window.location.replace('/');
  };

axios.interceptors.request.use(
    request => {
        const token = localStorage.getItem("authToken")
        if (token) {
            const decodedToken = decodeToken(token);
            const currentTime = Date.now() / 1000;
        
            if (decodedToken.exp < currentTime) {
              // Token is expired
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              navigateToLogin(); // Custom function to navigate to login page
              return Promise.reject('Token expired');
            } else {
              request.headers['Authorization'] = `Bearer ${token}`;
            }
          }
      // config.headers['Content-Type'] = 'application/json';
      return request
    },
    error => {
      Promise.reject(error)
    }
  )
  

  export default axios;
// axiosSetup.ts

