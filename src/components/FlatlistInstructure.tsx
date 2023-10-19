import React from "react";
import { FlatList, Box, HStack, VStack, View, Center, AspectRatio, Image, Stack, Button } from 'native-base';
import { StackNavigation } from 'types/RouteType';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import PATH from '@config/api';
import { toCurrency } from 'config/tools';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'config/colors';
import { TouchableOpacity } from 'react-native';
import { AppText } from "../components/Text";
import { ScrollView } from "react-native-gesture-handler";
import Instruktor from "@itype/IInstructor";
interface PropsData {
  val: Instruktor,
}


export default function FlatlistCourse({val}: PropsData) {
  const data = [
    {
      "id": 1,
      "firstname": "Taufik",
      "lastname": "Ariesandi",
      "cover_image": "storage/lpk/instructors/cover/35_2_1677037182_Banner(1).png"
  },
  {
    "id": 2,
    "firstname": "Taufik",
    "lastname": "Ariesandi",
    "cover_image": "storage/lpk/instructors/cover/35_2_1677037182_Banner(1).png"
  },
  {
    "id": 3,
    "firstname": "Taufik",
    "lastname": "Ariesandi",
    "cover_image": "storage/lpk/instructors/cover/35_2_1677037182_Banner(1).png"
  },
];
 
  
  const navigation = useNavigation();
  // const Detail = (slug: any) => {
  //   navigation.navigate('DetailCourse', { screen: 'DetailCourse', params: { urlslug: slug } } as never);
  // } 
  var deviceWidth: any = Dimensions.get('window').width;

  const renderItem = () => {
    return(
  <TouchableOpacity onPress={() => ''}>
    <View style={{ flexDirection: 'row' }}>
        <VStack w={deviceWidth / 2} p={2}>
          <Box alignItems="center">
            <Box
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "#E2E3E5",
                backgroundColor: "#ffffff"
              }}
              _web={{
                shadow: 1,
                borderWidth: 0
              }}
              _light={{
                backgroundColor: "#ffffff"
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    alt="Image Course"
                    source={{
                      uri:
                        "https://api.lpk.rumahlpk.com/storage/course/image/Thumbnail22_1663214936_Phyton-01.png",
                    }}
                  />
                </AspectRatio>
              </Box>
              <Stack paddingX={3} paddingY={5} space={2}>
              
                <AppText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  size={12}
                  font_type="bold"
                  style={{ lineHeight: 16 }}
                >
                  {val.firstname} {val.lastname}
                </AppText>
                <HStack alignContent={"center"} space={2}>
                  <Ionicons
                    name="star"
                    color={colors.warning500}
                    size={14}
                  />
                  <AppText size={10} color="secondary">
                    {/* {`${val.rating} (${toCurrency(val.review_count * 1)}) Ulasan`} */}
                  </AppText>
                </HStack>
                
              </Stack>
              <Button backgroundColor={'emerald.500'}>Lihat Kelas</Button>
            </Box>
          </Box>
        </VStack>
    </View>
    </TouchableOpacity>

    )
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={2}
    />
)}




