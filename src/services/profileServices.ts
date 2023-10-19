import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import { ITableResponse } from 'types/ITableResponse';
import ICardHistory from 'types/ICardHistory';

export default {
  histTrans : async () => {
    try {
      const response: AxiosResponse<ITableResponse<ICardHistory>> = await axiosInstance.post(
        PATH.baseapiurl + 'transaction/table'
      );
      return response.data.data.data;
    } catch (error) {
      throw error;
    }
  },
};
