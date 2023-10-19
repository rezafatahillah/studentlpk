import {
  HStack,
  Box,
  Input,
  Icon,
  Text,
  Avatar,
  Center,
  Button,
  VStack,
  ScrollView,
  Stack,
  FormControl,
  Select,
  CheckIcon,
  TextArea,
  Radio,
  IconButton,
  useToast,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  WarningOutlineIcon
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '@config/colors';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import PATH from '@config/api';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { AppText } from 'components/Text';
import INationality from 'types/INationality';
import IProfile from 'types/IProfile';
import { IProvince, ICity, IDistrict, IVillage } from '../../types/IRegion';
import profileService from '@services/profile';
import { ITableParams } from 'types/ITableParams';
import ProfileService from '@services/profile';
import RegionService from '@services/region';
import NationalityService from '@services/nationality';
import IndicatorLoading from 'components/indicatorLoading';
import Spinner from 'react-native-loading-spinner-overlay';
import ProfileSkeleton from 'components/ProfileAccountSkeleton';
import service from 'services/service';

var d = new Date();
var datestring: any =
  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

const Account = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(datestring);
  const [dateObj, setDateObj] = useState(new Date());
  const [service, setService] = useState('');

  const [profiles, setProfiles] = useState<IProfile>({
    uuid: '',
    student_id: 0,
    avatar: '',
    address: '',
    city_code: '',
    date_of_birth: '',
    description: '',
    district_code: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    gender: '',
    house_phone: '',
    mobile_phone: '',
    work_phone: '',
    nationality: '',
    place_of_birth: '',
    postal_code: '',
    province_code: '',
    village_code: '',
  });
  const [nationality, setNationality] = useState<INationality[]>([]);
  const [getsProvince, setGetsProvince] = useState<IProvince[]>([]);
  const [city, setCity] = useState<ICity[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [village, setVillage] = useState<IVillage[]>([]);

  const profile = useAppSelector(state => state.login);
  const dispatch = useDispatch();

  const [firstname, setFirstName] = useState(profile.dataLogin.firstname);
  const [lastname, setLastName] = useState(profile.dataLogin.lastname);
  const [skill, setSkill] = useState('');
  const [deskripsi, setDeskripsi] = useState(profiles.description);
  const [tempatLahir, setTempatLahir] = useState(profiles.place_of_birth);
  const [tanggalLahir, setTanggalLahir] = useState(profiles.date_of_birth);
  const [gender, setGender] = useState(profiles.gender);
  const [kewarganegaraan, setKewarganegaraan] = useState(profiles.nationality);
  const [email, setEmail] = useState(profiles.email);
  const [handphone, setHandphone] = useState(profiles.mobile_phone);
  const [tlpRumah, setTlpRumah] = useState(profiles.house_phone);
  const [tlpKantor, setTlpKantor] = useState(profiles.work_phone);
  const [provinsi, setProvinsi] = useState(profiles.province_code);
  const [kota, setKota] = useState(profiles.city_code);
  const [kelurahan, setKelurahan] = useState(profiles.district_code);
  const [kecamatan, setKecamatan] = useState(profiles.village_code);
  const [kodePos, setKodePos] = useState(profiles.postal_code);
  const [detailAlamat, setDetailAlamat] = useState(profiles.address);
  const [facebook, setFacebook] = useState(profiles.facebook);
  const [instagram, setInstagram] = useState(profiles.instagram);
  const [twitter, setTwitter] = useState(profiles.twitter);
  const [linkedIn, setLinkedIn] = useState(profiles.linkedin);
  const [dropdown, setDropdown] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  // console.log('wow', deskripsi);

  useEffect(() => {
    getUser();
    getProfile();
    getProvince();

    getNationality();
  }, []);

  useEffect(() => {
    // console.log("setProf useEffect", profiles);
  }, [profiles]);

  useEffect(() => {
    getCity();
  }, [provinsi]);

  useEffect(() => {
    // getDistrict();
  }, [kota]);

  useEffect(() => { }, [loading]);

  const headers = {
    'Content-Type': `application/json`,
    Authorization: `Bearer ${profile.dataLogin.token}`,
  };

  const getUser = async (): Promise<void> => {
    try {
      const response = await axios.get(PATH.baseapiurl + 'user', {
        headers: headers,
      });
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      toast.show({});
      console.error(error);
    }
  };

  const getProfile = async (): Promise<void> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${profile.dataLogin.token}`,
      Accept: 'application/json',
    };

    const service = new ProfileService(headers);

    async function fetchData() {
      const profileData = await service.getProfile();
      setProfiles(profileData);
      // console.log(profileData);
    }

    fetchData();
  };

  const getProvince = async (): Promise<void> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${profile.dataLogin.token}`,
      Accept: 'application/json',
    };

    const service = new RegionService(headers);

    async function province() {
      const provinceData = await service.getProvince();
      setGetsProvince(provinceData);
      // console.log(provinceData);
    }

    province();
  };

  const getNationality = async (): Promise<void> => {
    const headers = {
      'Content-Type': 'application/json',

      Accept: 'application/json',
    };

    const service = new NationalityService(headers);

    async function nationality() {
      const nationalityData = await service.nationality();
      setNationality(nationalityData);
      console.log('nation', nationalityData);
    }

    nationality();
  };

  const getCity = async (): Promise<void> => {
    let baseURL;
    if (provinsi === '') {
      baseURL = PATH.pathlpkimage + 'api/city/JK';
      // console.log('if', baseURL);
    } else {
      baseURL = PATH.pathlpkimage + 'api/city/' + provinsi;
      // console.log('else', baseURL);
    }

    try {
      const response = await axios.get(baseURL);
      const cityData = response.data.data;

      setCity(cityData);
      // console.log(kota);
    } catch (error: any) {
      toast.show({
        description: error.response.data.message,
      });
      console.error(error);
    }
  };

  const getDistrict = async (): Promise<void> => {
    // console.log('kota', kota);
    let baseURL;

    if (kota === '') {
    } else {
      baseURL = PATH.pathlpkimage + 'api/district/' + kota;
      console.log('else', baseURL);
    }

    try {
      const response = await axios.get(baseURL);
      const districtData = response.data.data;

      setDistrict(districtData);
    } catch (error: any) {
      toast.show({
        description: error.response.data.message,
      });
      console.error(error);
    }
  };

  // const getVillage = async (): Promise<void>  => {
  //   try {
  //     const response = await axios.get(PATH.baseapiurl + 'vilage/' + district.id, { headers: headers });
  //     const villageData = response.data;
  //     setDistrict(villageData);
  //     console.log("village",village);

  //   } catch (error:any) {
  //     toast.show({
  //       description: error.response.data.message
  //     })
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async () => {
    const param: IProfile = {
      firstname: firstname,
      lastname: lastname,
      skill: skill,
      description: deskripsi,
      place_of_birth: tempatLahir,
      date_of_birth: tanggalLahir,
      gender: gender,
      nationality: kewarganegaraan,
      mobile_phone: handphone,
      house_phone: tlpRumah,
      work_phone: tlpKantor,
      province_code: provinsi,
      city_code: kota,
      district_code: kelurahan,
      village_code: kecamatan,
      postal_code: kodePos,
      address: detailAlamat,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      linkedin: linkedIn,
      email: email,
    };
    console.log('param', param);

    const baseURL = PATH.baseapiurl + 'profile/update';

    setLoading(true);
    try {
      const response = await axios.post(baseURL, param, { headers: headers });
      setLoading(false);
      toast.show({
        description: response.data.message,
      });
    } catch (error: any) {
      toast.show({
        description: error.response.data.message,
      });
      setLoading(false);
      console.error(error);
    }
  };

  setTimeout(() => {
    setLoadingSkeleton(false);
  }, 3000);

  return (
    <>
      {loadingSkeleton && <ProfileSkeleton />}

      {loading && (
        <Spinner visible={loading} textContent={'Process...'} color="#fff" />
      )}
      {loadingSkeleton === true ? (
        ''
      ) : (
        <Box
          backgroundColor={'#fff'}
          zIndex={999}
          padding={5}
          borderTopWidth={1}
          borderTopColor={colors.bgGrey200}
          style={{ bottom: 0, left: 0, right: 0, position: 'absolute' }}>
          <Button colorScheme={'success'} onPress={handleSubmit}>
            Simpan Informasi
          </Button>
        </Box>
      )}

      {loadingSkeleton === true ? (
        ''
      ) : (
        <SafeAreaView>
          <ScrollView>
            <VStack space={2}>
              <VStack backgroundColor={colors.white}>
                <Center w="100%">
                  <Box safeArea p="2" py="4" w="100%" maxW="400">
                    <VStack space={2} mt="4">
                      <Center>
                        <Avatar
                          bg="green.500"
                          size="xl"
                          source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                          }}>
                          AJ
                        </Avatar>
                      </Center>
                      <FormControl mt={4}>
                        <AppText font_type="semibold">Nama Depan</AppText>
                        <Input
                          onChangeText={(txt: any) => setFirstName(txt)}
                          value={profile.dataLogin.firstname}
                          defaultValue={profile.dataLogin.firstname}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <AppText font_type="semibold">Nama Belakang</AppText>
                        <Input
                          onChangeText={(txt: any) => setLastName(txt)}
                          defaultValue={profile.dataLogin.lastname}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <AppText font_type="semibold">Keahlian</AppText>
                        <Input onChangeText={(txt: any) => setSkill(txt)} />
                      </FormControl>

                      <FormControl mt={4}>
                        <AppText font_type="semibold">
                          Deskripsi Singkat Anda
                        </AppText>
                        <TextArea
                          autoCompleteType={'Ceritakan sedikit tentang Anda'}
                          onChangeText={(txt: any) => setDeskripsi(txt)}
                          defaultValue={profiles.description}
                        />
                      </FormControl>

                      <FormControl></FormControl>

                      <FormControl mt={4}>
                        <AppText font_type="semibold">Tempat Lahir</AppText>
                        <Box maxW="100%">
                          <Select
                            selectedValue={tempatLahir}
                            defaultValue={profiles.province_code}
                            minWidth="200"
                            accessibilityLabel="Pilih Tempat Lahir"
                            placeholder="Pilih Tempat Lahir"
                            _selectedItem={{
                              bg: 'teal.600',
                              endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={itemValue =>
                              setTempatLahir(itemValue)
                            }>
                            {getsProvince.map((item, index) => (
                              <Select.Item
                                key={index}
                                label={item.province_name}
                                value={item.province_code}
                              />
                            ))}
                          </Select>
                        </Box>
                      </FormControl>
                      <FormControl mt={4}>
                        <AppText font_type="semibold">Tanggal Lahir</AppText>
                        <Input
                          placeholder="Dates"
                          w="100%"
                          maxLength={12}
                          keyboardType={'number-pad'}
                          defaultValue={profiles.date_of_birth}
                          // onChangeText={itemValue => setDate(itemValue)}
                          isReadOnly
                          InputRightElement={
                            <IconButton
                              variant="unstyled"
                              icon={
                                <Icon
                                  size="5"
                                  color="coolGray.400"
                                  as={MaterialIcons}
                                  name={'calendar-today'}
                                />
                              }
                              onPress={() => {
                                setOpen(true);
                              }}
                            />
                          }
                        />
                        <DatePicker
                          modal
                          open={open}
                          date={dateObj}
                          mode={'date'}
                          // eslint-disable-next-line @typescript-eslint/no-shadow
                          onConfirm={date => {
                            setOpen(false);
                            setDateObj(date);
                            setDate(datestring);
                            console.log(datestring);
                          }}
                          onCancel={() => {
                            setOpen(false);
                          }}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <AppText font_type="semibold">Jenis Kelamin</AppText>
                        <Radio.Group
                          name="gender"
                          onChange={itemValue => setGender(itemValue)}
                          defaultValue={gender}>
                          <Stack
                            direction={{
                              base: 'row',
                              md: 'row',
                            }}
                            alignItems={{
                              base: 'space-between',
                              md: 'center',
                            }}
                            space={4}
                            w="75%"
                            maxW="300px">
                            <Radio value="l">
                              <AppText>Laki-Laki</AppText>
                            </Radio>
                            <Radio value="p">
                              <AppText>Perempuan</AppText>
                            </Radio>
                          </Stack>
                        </Radio.Group>
                      </FormControl>
                      <FormControl mt={4}>
                        <AppText font_type="semibold">Kewarganegaraan</AppText>
                        <Box maxW="100%">
                          <Select
                            selectedValue={profiles.nationality}
                            minWidth="200"
                            accessibilityLabel="Pilih Kewarganegaraan"
                            placeholder="Pilih Kewarganegaraan"
                            _selectedItem={{
                              bg: 'teal.600',
                              endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={itemValue =>
                              setKewarganegaraan(itemValue)
                            }>
                            {nationality.map((item, index) => (
                              <Select.Item
                                key={index}
                                label={item.label}
                                value={item.code_name}
                              />
                            ))}
                          </Select>
                        </Box>
                      </FormControl>
                    </VStack>
                  </Box>
                </Center>
              </VStack>
              <VStack padding={5} backgroundColor={colors.white}>
                <AppText size={20} font_type="bold">
                  Kontak
                </AppText>

                <Box alignItems="center" mt={5}>
                  <FormControl >
                    <FormControl.Label><AppText font_type="semibold">Email</AppText></FormControl.Label>
                    <Stack alignItems="center">
                      <Input
                        onChangeText={(txt: any) => setEmail(txt)}
                        value={profile.dataLogin.email}
                      />
                    </Stack>
                  </FormControl>
                </Box>

                <Box alignItems="center" mt={5}>
                  <FormControl >
                    <FormControl.Label><AppText font_type="semibold">Nomor Handphone</AppText></FormControl.Label>
                    <Stack alignItems="center">
                      <InputGroup w={{
                        base: "100%",
                        md: "285"
                      }}>
                        <InputLeftAddon children={"+62"} />
                        <Input
                          keyboardType={'number-pad'}
                          onChangeText={(txt: any) => setHandphone(txt)}
                          defaultValue={profiles.mobile_phone}
                          w={{
                            base: "88%",
                            md: "100%"
                          }} placeholder="812-1000-2000" />
                      </InputGroup>
                    </Stack>
                  </FormControl>
                </Box>

                <Box alignItems="center" mt={5}>
                  <FormControl >
                    <FormControl.Label><AppText font_type="semibold">Telepon Rumah</AppText></FormControl.Label>
                    <Stack alignItems="center">
                      <InputGroup w={{
                        base: "100%",
                        md: "285"
                      }}>
                        <InputLeftAddon children={"+62"} />
                        <Input
                          keyboardType={'number-pad'}
                          onChangeText={(txt: any) => setTlpRumah(txt)}
                          defaultValue={profiles.house_phone}
                          w={{
                            base: "88%",
                            md: "100%"
                          }} placeholder="812-1000-2000" />
                      </InputGroup>
                    </Stack>
                  </FormControl>
                </Box>

                <Box alignItems="center" mt={5}>
                  <FormControl >
                    <FormControl.Label><AppText font_type="semibold">Telepon Kantor</AppText></FormControl.Label>
                    <Stack alignItems="center">
                      <InputGroup w={{
                        base: "100%",
                        md: "285"
                      }}>
                        <InputLeftAddon children={"+62"} />
                        <Input
                          keyboardType={'number-pad'}
                          onChangeText={(txt: any) => setTlpKantor(txt)}
                          defaultValue={profiles.work_phone}
                          w={{
                            base: "88%",
                            md: "100%"
                          }} placeholder="812-1000-2000" />
                      </InputGroup>
                    </Stack>
                  </FormControl>
                </Box>

              </VStack>
              <VStack padding={5} backgroundColor={colors.white}>
                <AppText size={20} font_type="bold">
                  Alamat
                </AppText>
                <FormControl mt={5}>
                  <AppText font_type="semibold">Provinsi</AppText>
                  <Box maxW="100%">
                    <Select
                      selectedValue={provinsi}
                      minWidth="200"
                      accessibilityLabel="Choose Service"
                      placeholder="Pilih Provinsi"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => setProvinsi(itemValue)}>
                      {getsProvince.map((item, index) => (
                        <Select.Item
                          key={index}
                          label={item.province_name}
                          value={item.province_code}
                        />
                      ))}
                    </Select>
                  </Box>
                </FormControl>
                <FormControl mt={4}>
                  <AppText font_type="semibold">Kota</AppText>
                  <Box maxW="100%">
                    <Select
                      selectedValue={kota}
                      defaultValue={profiles.city_code}
                      minWidth="200"
                      accessibilityLabel="Choose Service"
                      placeholder="Pilih Kota / Kabupaten"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => setKota(itemValue)}>
                      {city.map((item, index) => (
                        <Select.Item key={index} label={item.name} value={item.id} />
                      ))}
                    </Select>
                  </Box>
                </FormControl>
                <FormControl mt={4}>
                  <AppText font_type="semibold">Kecamatan</AppText>
                  <Box maxW="100%">
                    <Select
                      selectedValue={kecamatan}
                      defaultValue={profiles.district_code}
                      minWidth="200"
                      accessibilityLabel="Choose kecamatan"
                      placeholder="Pilih Kecamatan"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={itemValue => setKecamatan(itemValue)}>
                      {district.map((item, index) => (
                        <Select.Item key={index} label={item.name} value={item.id} />
                      ))}
                    </Select>
                  </Box>
                </FormControl>
                <FormControl mt={4}>
                  <AppText font_type="semibold">Kode Pos</AppText>
                  <Input
                    keyboardType={'number-pad'}
                    onChangeText={(txt: any) => setKodePos(txt)}
                    defaultValue={profiles.postal_code}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <AppText font_type="semibold">Detail Alamat</AppText>
                  <TextArea
                    autoCompleteType={
                      'Detail alamat kamu, seperti Nama Jalan, No. Rumah dan Kode Pos'
                    }
                    onChangeText={(txt: any) => setDetailAlamat(txt)}
                    defaultValue={profiles.address}
                  />
                </FormControl>
              </VStack>
              <VStack padding={5} backgroundColor={colors.white} space={4}>
                <AppText size={20} font_type="bold">
                  Media Sosial
                </AppText>

                <Input
                  onChangeText={(txt: any) => setFacebook(txt)}
                  defaultValue={profiles.facebook}
                  w={{
                    base: "100%",
                    md: "25%"
                  }}
                  InputLeftElement={<Icon as={<MaterialCommunityIcons name="facebook" />} size={5} ml="2" color="muted.400" />}
                  placeholder="Facebook"
                />

                <Input
                  onChangeText={(txt: any) => setInstagram(txt)}
                  defaultValue={profiles.instagram}
                  w={{
                    base: "100%",
                    md: "25%"
                  }}
                  InputLeftElement={<Icon as={<MaterialCommunityIcons name="instagram" />} size={5} ml="2" color="muted.400" />}
                  placeholder="Instagram"
                />

                <Input
                  onChangeText={(txt: any) => setTwitter(txt)}
                  defaultValue={profiles.twitter}
                  w={{
                    base: "100%",
                    md: "25%"
                  }}
                  InputLeftElement={<Icon as={<MaterialCommunityIcons name="twitter" />} size={5} ml="2" color="muted.400" />}
                  placeholder="Twitter"
                />

                <Input
                  onChangeText={(txt: any) => setLinkedIn(txt)}
                  defaultValue={profiles.linkedin}
                  w={{
                    base: "100%",
                    md: "25%"
                  }}
                  InputLeftElement={<Icon as={<MaterialCommunityIcons name="linkedin" />} size={5} ml="2" color="muted.400" />}
                  placeholder="Linkedin"
                />

              </VStack>
            </VStack>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Account;
