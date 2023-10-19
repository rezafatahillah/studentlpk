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

import CardDetailLpkPage from 'components/CardDetailLpkPage';
import CardDetailLpkProfile from 'components/CardDetailLpkProfile';
import CardDetailLpkClass from 'components/CardDetailLpkClass';
import CardDetailLpkUser from 'components/CardDetailLpkUser';
import CardDetailLpkComment from 'components/CardDetailLpkComment';
import CardSearchLPK from 'components/CardSearchLPK';
import { AppText } from 'components/Text';


function InstructurePageDetail({ route }) {
  const slug = route.params;
  console.log(slug);
  
  // const [itemDataUsers, setItemDataUsers] = useState<ILpkDetail>({});
  // const redux_profile = useAppSelector(state => state.login);

  // const [loading, setLoading] = useState(true);
  // const HEADER_HEIGHT = 250;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (slug) {
  //     setLoading(false);
  //     service
  //       .getLpkDetail(slug)
  //       .then((response) => {
  //         // console.log(response)
  //         setItemDataUsers(response);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(`Error while getting courses: ${error}`);
  //         setLoading(false);
  //       });
  //   }
  // }, [slug]);


  return (
    <AppText>kdkdk</AppText>
  );
}


export default InstructurePageDetail;
