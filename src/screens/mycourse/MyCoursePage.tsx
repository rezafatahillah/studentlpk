import React, { useEffect, useState } from "react";
import { HStack, Center, Button, VStack, Image, View, Toast } from "native-base";
import { AppText } from "../../components/Text";
import { useAppSelector } from "redux/hooks";
import COLORS from '@config/colors';
import courseService from "@services/courseService";
import { IMycourse } from "types/IMycourse";
import MyCourseContent from "./MyCourseContent";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "types/RouteType";
import IParamsMyCourse from "types/IParamsMyCourse";
import { IFilterCourse } from "config/dictionary";


const MyCoursePage = () => {
  const redux_profile = useAppSelector((state: any) => state.login)
  const [itemData, setItemData] = useState<IMycourse[]>([])
  const [refresh, setRefresh] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<string>(' ');
  const [params, setParams] = useState<IParamsMyCourse>({
    enroll_status: ' ',
  });
  const navigation = useNavigation<StackNavigation>();
  const getKelasTerbaru = async () => {
    setRefresh(true);
    courseService.mycourse({columnFilters:params}).then(ret => {
      console.log("MYCOURSE",ret);
      setItemData(ret);
      setRefresh(false);
    }).catch(err => {
      setRefresh(false);
    })
  }
  useEffect(() => {
    getKelasTerbaru()
  }, [params]);
  const onRefresh = async () => {
    await getKelasTerbaru();
    return
  }
  const onFilter = (item: IFilterCourse): void => {
    if (item.value == 'ES4') {
      setParams({ enroll_status: item.value, progress: 100 });
    } else {
      setParams({ enroll_status: item.value });
    }
  }
  return (
    <View  bgColor='#fff'>

      {redux_profile?.dataLogin?.email ? (
        // <AppText>kdkkd</AppText>
        <MyCourseContent data={itemData} onFilter={onFilter} params={params} refresh={refresh} onRefresh={onRefresh} />
      ) : (
        <VStack mt={40} space={3}>
          <Center>
            <Image
              alt="image"
              source={require('../../../assets/images/artwork.png')}
            />
            <AppText size={14} mt={3} font_type="semibold">Kelasmu Masih Kosong</AppText>
            <AppText color="secondary" mt={2} mb={4}>Masuk ke profil untuk melihat kelas</AppText>

          </Center>
          <Button onPress={() => navigation.navigate('loginpage')} rounded="10" ml={3} mr={3} h="50px" bg={COLORS.buttonsubmitlpk} borderColor={COLORS.teal100} borderWidth={2} >
            <AppText size={16} color={COLORS.white} font_type='bold'> Masuk </AppText>
          </Button>
        </VStack>
      )}
    </View >
  )
}

export default MyCoursePage;