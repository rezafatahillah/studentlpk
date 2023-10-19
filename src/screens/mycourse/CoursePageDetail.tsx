import {
  Button,
  Skeleton,
  VStack,
  View,
  Box,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@redux/hooks';
import ICourses from "types/courses/ICourse";
import service from 'services/service';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

import CoursePageDetail_Page from './CoursePageDetail_Page';
import CoursePageDetail_Info from './CoursePageDetail_Info';
import CoursePageDetail_Profile from './CoursePageDetail_Profile';
import CoursePageDetail_Rating from './CoursePageDetail_Rating';
import CardSearchClass from 'components/CardSearchClass';

import { AppText } from 'components/Text';
import CardButtonBuySnap from 'components/CardButtonBuySnap';


function CoursePageDetail(props: any) {
  const slug = props.route.params.params.urlslug;

  const [detailClass, setDetailClass] = useState<ICourses>();
  const navigationStack = useNavigation<StackNavigation>();
  // const redux_profile = useAppSelector(state => state.login);

  const [loading, setLoading] = useState(true);
  const HEADER_HEIGHT = 250;
  // const profile = useAppSelector(state => state.login);
  // const dispatch = useDispatch();

  const [paramSnap, setParamSnap] = useState<Object>({
    transaction_details: [
      {
        product_id: ''
      }
    ]
  })

  const getSnapToken = (classid: string) => {

    // Update paramSnap state with new product_id
    const updatedParamSnap = {
      ...paramSnap,
      transaction_details: [
        {
          product_id: classid
        }
      ]
    };

    service.getSnapToken(updatedParamSnap).then((response) => {
      // console.log("masuk:" + response)
      // setSnapID(response)
      navigationStack.navigate('payment', { screen: 'DetailProduct', params: { snap_token: response } } as never)
    }).catch((error) => {
      console.log("error:" + error)
      navigationStack.navigate('trans_history')
    });

  }

  useEffect(() => {
    if (slug) {
      setLoading(true);
      service.getCourseDetail(slug).then((response) => {
        // console.log(response)
        setDetailClass(response)
        setLoading(false)
      }).catch((error) => {
        console.log(`Error while getting courses: ${error}`);
        setLoading(false)
      });
    }
  }, [slug]);

  const tabBar = props => (
    <MaterialTabBar
      {...props}
      activeColor="#00B683"
      inactiveColor="gray"
      indicatorStyle={{ backgroundColor: '#00B683' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  const MyHeader = () => {

    return (
      <View>
        <SafeAreaView>
          <CardSearchClass />
          {loading ? (
            <View>
              <Skeleton px="4" my="4" rounded="md" />
              <Skeleton.Text pt={2} />
              <Skeleton p={2} h="40" />
              <Skeleton.Text pt={2} />
              <Skeleton.Text pt={2} />
              <Skeleton.Text pt={2} />
              <Skeleton.Text pt={2} />
              <Skeleton.Text pt={2} />
              <Skeleton.Text pt={2} />
              <Skeleton px="4" my="4" rounded="md" />
            </View>
          ) : (
            <CoursePageDetail_Page val={detailClass} />
          )}
        </SafeAreaView>
      </View>
    );
  };

  return (
    <>
      <Tabs.Container
        renderHeader={MyHeader}
        headerHeight={HEADER_HEIGHT}
        renderTabBar={tabBar}
      >
        <Tabs.Tab name="1" label="office-building">
          <Tabs.ScrollView>
            <CoursePageDetail_Info val={'Deskripsi kelas'} val2={detailClass?.description} />
            <CoursePageDetail_Info val={'Hasil Pembelajaran'} val2={detailClass?.results} />
            <CoursePageDetail_Info val={'Apa yang harus disiapkan'} val2={detailClass?.preparations} />
            <CoursePageDetail_Info val={'Kemampuan dasar yang harus dipunyai'} val2={detailClass?.fundamentals} />
            <CoursePageDetail_Info val={'Manfaat Yang Di Dapat'} val2={detailClass?.benefit} />
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="2" label="book-open-outline">
          <Tabs.ScrollView>
            <CoursePageDetail_Profile val={'Lembaga Pelatihan'} val2={detailClass?.lpk} />
            <CoursePageDetail_Profile val={'Instruktur'} val2={detailClass?.course_instructor} />
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="3" label="account-lock">
          <Tabs.ScrollView>
            <CoursePageDetail_Rating val={detailClass?.slug} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>

      <CardButtonBuySnap val={detailClass?.uuid} />
    </>
  );
}


export default CoursePageDetail;