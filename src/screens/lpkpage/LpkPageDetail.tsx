import {
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@redux/hooks';

import { ILpkDetail } from 'types/ILpkDetail';
import { useDispatch } from 'react-redux';
import service from '@services/service';
import LpkPageSkeleton from 'components/LpkPageSkeleton';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

import LpkPageDetail_Page from './LpkPageDetail_Page';
import LpkPageDetail_Profile from './LpkPageDetail_Profile';
import LpkPageDetail_Class from './LpkPageDetail_Class';
import LpkPageDetail_User from './LpkPageDetail_User';
import LpkPageDetail_Rating from './LpkPageDetail_Rating';

import CardSearchLPK from 'components/CardSearchLPK';


function LpkPageDetail({ route }) {
  const slug = route.params.slug;
  const [itemDataUsers, setItemDataUsers] = useState<ILpkDetail>({});
  const redux_profile = useAppSelector(state => state.login);

  const [loading, setLoading] = useState(true);
  const HEADER_HEIGHT = 250;
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      setLoading(false);
      service
        .getLpkDetail(slug)
        .then((response) => {
          // console.log(response)
          setItemDataUsers(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`Error while getting courses: ${error}`);
          setLoading(false);
        });
    }
  }, [slug]);

  const tabBar = props => (
    <MaterialTabBar
      {...props}
      activeColor="#00B683"
      inactiveColor="grey"
      indicatorStyle={{ backgroundColor: '#00B683' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  const MyHeader = () => {

    return (
      <View>
        <SafeAreaView>
          <CardSearchLPK />
          {loading ? (
            <LpkPageSkeleton />
          ) : (
            <LpkPageDetail_Page val={itemDataUsers} />
          )}
        </SafeAreaView>
      </View>
    );
  };

  return (
    <Tabs.Container
      renderHeader={MyHeader}
      headerHeight={HEADER_HEIGHT}
      renderTabBar={tabBar}>
      <Tabs.Tab name="1" label="office-building">
        <Tabs.ScrollView>
          <LpkPageDetail_Profile val={itemDataUsers} />
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="2" label="book-open-outline">
        <LpkPageDetail_Class val={itemDataUsers} />
      </Tabs.Tab>

      <Tabs.Tab name="3" label="account-lock">
        <LpkPageDetail_User val={itemDataUsers} />
      </Tabs.Tab>

      <Tabs.Tab name="4" label="star-outline">
        <Tabs.ScrollView>
          <LpkPageDetail_Rating val={itemDataUsers} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}


export default LpkPageDetail;
