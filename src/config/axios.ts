import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import PATH from '@config/api';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout } from 'redux/apps/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: PATH.baseapiurl,
  timeout: 5000, // waktu maksimal request adalah 5 detik
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  async(config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('token');
    console.log("token",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (!config.headers.Authorization) {
    //   const redux_profile = useAppSelector(state => state.login);
    //   config.headers.Authorization = `Bearer ${redux_profile.dataLogin.token}`;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      console.log("LOGIN LAH BLOK");
        // const dispatch = useAppDispatch();
        // dispatch(logout());
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
