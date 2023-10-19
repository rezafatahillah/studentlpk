import axios from 'axios';
import PATH from '@config/api';

class ProfileService {
  private headers: any;

  constructor(headers: any) {
    this.headers = headers;
  }

  public async getProfile(): Promise<any> {
    try {
      const response = await axios.get(PATH.baseapiurl + 'profile', { headers: this.headers });
      const profileData = response.data.data.student_profile;
      return profileData;
    } catch (error) {
      throw new Error(`Error while getting profile: ${error}`);
    }
  }
}

export default ProfileService;