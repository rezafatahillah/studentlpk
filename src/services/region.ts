import axios from 'axios';
import PATH from '@config/api';

class RegionService {
  private headers: any;

  constructor(headers: any) {
    this.headers = headers;
  }

  public async getProvince(): Promise<any> {
    try {
      const response = await axios.get(PATH.baseapiurl + 'province', { headers: this.headers });
      const provinceData = response.data.data.data;
      return provinceData;
    } catch (error) {
      throw new Error(`Error while getting profile: ${error}`);
    }
  }
}

export default RegionService;