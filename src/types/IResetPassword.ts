export interface Email {
  email: string;
}

export interface OTP {
  email: any;
  otp: string;
}

export interface ResetPassword{
  
  email: any;
  key: string;
  password: string;
  password_confirm: string;
}

export interface ChangePassword{
  password: string;
  password_confirm: string;
  password_old: string;
}