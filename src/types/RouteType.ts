import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IContent, IQuis } from './ILmsCourse';
import { Batch } from './IQuestion';

//type checks for Stack Root
export type StackNavigationList = {

    //Home Page
    loginpage:undefined

    //LPK Page
    lpkList:{
        title:string
    },
    lpkDetail:{
        name:string,
        slug:string
    },

    //Course Page
    courseList:{
        title:string
    },
    courseDetail:{
        title: string
    }

    //Instruktur
    instrukturDetail:{
        slug:string
    },









    
    register:undefined
    forgot_pass_1:undefined
    trans_history:undefined
    trans_detail:undefined
    
    kebijakan: undefined
    sertifikasi: undefined
    refund: undefined
    lmspage:{
        slug:string,
        title?:string
    },
    
    
    
    
    

    //search
    
    

    

    //quiz
    quizpage:{
        content:IContent<IQuis>,
        content_uuid:string,
        slug:string
    },

    //certificate
    certificateStudent:undefined,
    certificateCourse:{
        slug:string,
        title?:string
    },
    certificateCheck:undefined,

    payment:{
        slug:string,
        title?:string
    },
    forgot2: string,
};

export type TabsNavigationList = {
    home:undefined
    trans_history:Object
    myclass:Object
    lpkpage:Object
    account:Object
};


  export type StackNavigation = NativeStackNavigationProp<StackNavigationList,'loginpage'>;
  export type TabNavigation = NativeStackNavigationProp<TabsNavigationList,'home'>;
  