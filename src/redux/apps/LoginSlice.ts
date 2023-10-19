import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginState {
  dataLogin:{
    isLogin: boolean;
    token: string;
    fullname:string;
    username: string;
    firstname: string;
    lastname:string;
    profilePicture: string;
    email: string;
    value:number;
    darkMode:string;
    afterInstall:boolean;
  },
  darkMode:string;
}

const initialState: LoginState = {
  dataLogin: {
    isLogin: true,
    token:'',
    fullname:'',
    username: '',
    firstname: '',
    lastname:'',
    profilePicture: '',
    email: '',
    value: 0,
    darkMode: 'light',
    afterInstall: false
  },
  darkMode: 'light',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDataLogin: (state, action: PayloadAction<any>): void => {
      state.dataLogin=action.payload;
    },
    logout :(state) => {
      state.dataLogin.isLogin = false;
      state.dataLogin.username = '';
      state.dataLogin.firstname = '';
      state.dataLogin.lastname = '';
      state.dataLogin.profilePicture = '';
      state.dataLogin.token = '';
      state.dataLogin.email = '';
      AsyncStorage.removeItem('token');
      //const token = await AsyncStorage.getItem('token');
    },
    changeDarkMode: (state,action: PayloadAction<any>): void =>{
      state.darkMode = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setDataLogin,changeDarkMode, logout } = LoginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login


export default LoginSlice.reducer;