import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import IUser from 'types/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  login: async (params) => {
    try {
      const response: AxiosResponse<IResponse<IUser>> = await axiosInstance.post(
        PATH.baseapiurl + 'authentication/login',
        params,
      );
      AsyncStorage.setItem('token',response.data.data.token)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
