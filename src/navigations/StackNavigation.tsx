import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '@screens/auth/LoginPage';
import CoursePageDetail from 'screens/mycourse/CoursePageDetail';
import TabNavigation from './TabsNavigation';
import HistoryTransaction from 'screens/profile/HistoryTransaction';
import DetailHistoryTransaction from 'screens/profile/DetailHistoryTransaction';
import Register from 'screens/auth/RegisterScreen';
import Syarat from 'screens/auth/SyaratScreen';
import Aktivasi from 'screens/auth/AktivasiScreen';

import LmsPage from 'screens/lms/LmsPage';
import QuisPage from 'screens/lms/QuisPage';

import detailInstructure from 'screens/lpkpage/InstructurePageDetail';
import AccountSetting from '../screens/profile/AccountSetting';
import Forgot1 from 'screens/auth/Forgot1';
import Forgot2 from 'screens/auth/Forgot2';
import Forgot3 from 'screens/auth/Forgot3';
import LpkPage from 'screens/lpkpage/LpkPageDetail';
import ChangePassword from 'screens/profile/ChangePassword';

// import CertificateStudent from 'screens/certificate/CertificateByStudent';
import CertificateCourse from 'screens/certificate/CertificateByCourse';
import CertificateCheck from 'screens/certificate/CekCertificate';

import Payment from '@screens/payment/paymentpage';
import Kebijakan from 'screens/auth/KebijakanPrivasiScreen';
import Sertifikasi from 'screens/profile/KebijakanSertifikasi';
import Refund from 'screens/profile/KebijakanRefund';

//LPK
import LPKList from '@screens/lpkpage/LpkPageList';
import CourseList from '@screens/mycourse/CoursePageList';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      {/*
      ###############################################################################
      ############################# HOME SECTION ####################################
      ###############################################################################
      */}
      <Stack.Screen
        name="homepage"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      {/*
      ###############################################################################
      ############################# LPK SECTION #####################################
      ###############################################################################
      */}
      <Stack.Screen
        name="lpkList"
        component={LPKList}
        options={{ headerShown: true, headerTitle: 'Daftar LPK' }}
      />

      <Stack.Screen
        name="lpkDetail"
        component={LpkPage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="instrukturDetail"
        component={detailInstructure}
        options={{ headerShown: false }}
      />

      {/*
      ###############################################################################
      ############################# COURSE SECTION ##################################
      ###############################################################################
      */}
      <Stack.Screen
        name="courseList"
        component={CourseList}
        options={{ headerShown: true, headerTitle: 'Daftar Kelas' }}
      />

      <Stack.Screen
        name="courseDetail"
        component={CoursePageDetail}
        options={{ headerShown: false, title: 'Detail Kursus' }}
      />
      {/*
      ###############################################################################
      ############################# PROFILE SECTION #################################
      ###############################################################################
      */}

      {/* Certificate */}
      <Stack.Screen
        name="certificateCourse"
        component={CertificateCourse}
        options={{ headerShown: true, title: 'Cek Sertifikat' }}
      />


      <Stack.Screen
        name="loginpage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Aktivasi"
        component={Aktivasi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="syarat"
        component={Syarat}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="kebijakan"
        component={Kebijakan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sertifikasi"
        component={Sertifikasi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="refund"
        component={Refund}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="forgot_pass_1"
        component={Forgot1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgot_pass_2"
        component={Forgot2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgot_pass_3"
        component={Forgot3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trans_history"
        component={HistoryTransaction}
        options={{ headerShown: true, headerTitle: 'Riwayat Pembelian' }}
      />
      <Stack.Screen
        name="trans_detail"
        component={DetailHistoryTransaction}
        options={{ headerShown: true, headerTitle: 'Detail Pembelian' }}
      />


      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: true, title: 'Keamanan Akun' }}
      />






      {/* <Stack.Screen
        name="certificateStudent"
        component={CertificateStudent}
        options={{
          headerShown: true,
          title: 'Sertifikat Belajar HTML dari Awal Sampai mahir',
        }}
      /> */}

      <Stack.Screen
        name="certificateCheck"
        component={CertificateCheck}
        options={{
          headerShown: true,
          title: 'Sertifikat Belajar HTML dari Awal Sampai mahir',
        }}
      />
      <Stack.Screen
        name="payment"
        component={Payment}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="lmspage"
        component={LmsPage}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="quizpage"
        component={QuisPage}
        options={{ headerShown: true }}
      />





    </Stack.Navigator>
  );
}

export default StackNavigation;
