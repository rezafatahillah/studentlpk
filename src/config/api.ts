//developement
const uri = 'https://api.student.rumahlpk.com';
const uri_lpk_image = 'https://api.lpk.rumahlpk.com';
const uri_admin_image = 'https://api.admin.rumahlpk.com';
const SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com/v2';
const PRODUCTION_BASE_URL = 'https://api.midtrans.com/v2';

export default {
  pathadminimage: uri_admin_image + '/',
  pathlpkimage: uri_lpk_image + '/',
  lpkstudent_: 'https://api.student.rumahlpk.com/',
  auth: uri + '/api/authentication/login',
  baseapiurl: uri + '/api/',
  certificateCourse : uri + '/api/certificate/mycertificate/course/',
};
