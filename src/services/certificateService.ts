import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import { ChangePassword } from 'types/IResetPassword';


export default {
  updatePassword: async () => {
    try {
      const response: AxiosResponse<IResponse<ChangePassword>> = await axiosInstance.post(
        PATH.baseapiurl + 'profile/change_password'
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting instructor: ${error}`);
    }
  },
};