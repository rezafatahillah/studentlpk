import { Box, CheckIcon, Divider, HStack, Icon, Input, Modal, ScrollView, Select, Skeleton, View, VStack, Button, Text } from "native-base";
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardListCourse from "components/CardListCourse";
import service from "services/service";
import { ITableParams } from "types/ITableParams";
import { RefreshControl } from 'react-native';
import ICourse from 'types/courses/ICourse';
import CardListCourseSkeleton from "components/CardListCourseSkeleton";
import IDataCourse from "types/courses/IDataCourse";
import CardFilterComponent from "screens/mycourse/CoursePageFilter";

const CoursePageList = () => {
  const [course, setCourse] = useState<IDataCourse>();
  const [courseDetail, setCourseDetail] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    category: string[];
    jenisKelas: string[];
    tingkat: string[];
    rate: string[];
  }>({
    category: [],
    jenisKelas: [],
    tingkat: [],
    rate: []
  });

  const [params, setParams] = useState<ITableParams>({
    fields: [
      'id',
      'title',
      'slug',
      'price_before',
      'price',
      'is_discount',
      'uuid',
      'image',
      'image_thumbnail',
      'thumbnail_img',
      'video_thumbnail',
      'course_instructor.*',
      'course_instructor.instructors.*',
      'type.*',
      'kind.*',
      'lpk.*',
      'lpk.lpk_detail.*',
      'is_publish'
    ],
    page: 1,
    perPage: 10,
    filters: [],
    sort: []
  });

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSearchTextChange = (value: string) => {
    setSearchValue(value);
    setFilterValue("");
    setSortValue("");

    const updatedFilters = params.filters || [];
    const filteredFilters = updatedFilters.filter(filter => filter.column !== "name");
    const newParams: ITableParams = {
      ...params,
      filters: [
        ...filteredFilters,
        {
          column: "title",
          operator: "like",
          value: "%" + value + "%"
        },
      ],
      page: 1,
      sort: [], // Mengosongkan sort
    };
    setParams(newParams);
    setCourseDetail([]); // Mengosongkan courseDetail
  };

  const handleSelectSortingChange = (value: string) => {
    setSortValue(value);
    const updatedParams: ITableParams = {
      ...params,
      sort: [
        {
          type: value === 'terkecil' ? 'desc' : 'asc',
          field: value === 'terkecil' || value === 'tertinggi' ? 'rating' : 'created_at'
        }
      ]
    };
    setParams(updatedParams);
  };


  const loadMore = () => {
    if (course && course.last_page && params.page !== undefined && params.page < course.last_page) {
      const updatedParams: ITableParams = {
        ...params,
        page: params.page + 1,
      };
      setParams(updatedParams);
    }
  };

  const onRefresh = () => {
    setSearchValue("");
    setFilterValue("");
    setSortValue("");

    setParams({
      fields: [
        'id',
        'title',
        'slug',
        'price_before',
        'price',
        'is_discount',
        'uuid',
        'image',
        'image_thumbnail',
        'thumbnail_img',
        'video_thumbnail',
        'course_instructor.*',
        'course_instructor.instructors.*',
        'type.*',
        'kind.*',
        'lpk.*',
        'lpk.lpk_detail.*',
        'is_publish'
      ],
      page: 1,
      perPage: 8,
      filters: [],
      sort: [],
    });
  }

  const showLoadMoreButton = course && course.last_page !== params.page;

  const handleApplyFilter = (category: string[], jenisKelas: string[], tingkat: string[], rate: string[]) => {
    setAppliedFilters({
      category,
      jenisKelas,
      tingkat,
      rate
    });
    
    const updatedFilters = params.filters || [];
    const filteredFilters = updatedFilters.filter(filter => filter.column !== "name");

    // Membuat filter untuk setiap elemen dalam array category
    const categoryFilters = category.map(categoryItem => ({
      column: "category",
      operator: "equal",
      value: categoryItem
    }));

    // Membuat filter untuk setiap elemen dalam array jenisKelas
    const jenisKelasFilters = jenisKelas.map(jenisKelasItem => ({
      column: "jenisKelas",
      operator: "equal",
      value: jenisKelasItem
    }));

    // Membuat filter untuk setiap elemen dalam array tingkat
    const tingkatFilters = tingkat.map(tingkatItem => ({
      column: "tingkat",
      operator: "equal",
      value: tingkatItem
    }));

    // Membuat filter untuk setiap elemen dalam array rate
    const rateFilters = rate.map(rateItem => ({
      column: "rate",
      operator: "equal",
      value: rateItem
    }));

    const newParams: ITableParams = {
      ...params,
      filters: [
        ...filteredFilters,
        ...categoryFilters,
        ...jenisKelasFilters,
        ...tingkatFilters,
        ...rateFilters,
      ],
      page: 1,
      sort: [], // Mengosongkan sort
    };

    setParams(newParams);
  };

  useEffect(() => {
    console.log(params)
    setLoading(true);
    service.getCourses2(params)
      .then(response => {
        // console.log(response)
        if (response !== undefined) {
          setCourse(response);
          if (params.page === 1) {
            setCourseDetail(response.data);
          } else {
            setCourseDetail(prevCourseDetail => [...prevCourseDetail, ...response.data]);
          }
        }
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        console.log("err from component", err);
      });
  }, [params]);


  const renderCoursesInRows = (): JSX.Element[] => {
    const rows = [] as any[]; // Pengecoran eksplisit dengan tipe any[]
    const numColumns = 2;
    const totalCourses = courseDetail.length;

    for (let i = 0; i < totalCourses; i += numColumns) {
      const row = (
        <HStack key={i}>
          {courseDetail.slice(i, i + numColumns).map((item, index) => (
            <CardListCourse data={item} key={index} />
          ))}
        </HStack>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 10 }}>
        <VStack>
          <Input
            backgroundColor="white"
            InputLeftElement={
              <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />
            }
            placeholder="Cari Kelas"
            value={searchValue}
            onChangeText={handleSearchTextChange}
          />

          <HStack style={{ marginVertical: 10 }} space={1}>
            <Button
              onPress={() => setIsOpen(true)}
              colorScheme="blue"
              variant="solid"
              startIcon={<Icon as={MaterialIcons} name="filter-list" size={6} color="white" />}
              justifyContent="flex-start"
              flex={4}
            >
              Filter
            </Button>

            <Select
              selectedValue={sortValue}
              onValueChange={itemValue => {
                handleSelectSortingChange(itemValue);
              }}
              minWidth={'50%'}
              accessibilityLabel="Semua Status"
              placeholder="Urutkan"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}>
              <Select.Item label="Kelas Terbaru" value="terbaru" />
              <Select.Item label="Kelas Terlama" value="terlama" />
            </Select>
          </HStack>
        </VStack>
      </View>
      <Divider />

      <CardFilterComponent isOpen={isOpen} onClose={onClose} onApplyFilter={handleApplyFilter} />

      {/* <VStack>
        <Text>Kategori : {appliedFilters.category} </Text>
        <Text>Jenis : {appliedFilters.jenisKelas} </Text>
        <Text>Tingkat : {appliedFilters.tingkat} </Text>
        <Text>Rate : {appliedFilters.rate} </Text>
      </VStack> */}

      {loading ? (
        <View>
          <CardListCourseSkeleton />
          <Button isLoading borderRadius="full" colorScheme="success" mt={2} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
          style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}
        >
          {renderCoursesInRows()}

          {showLoadMoreButton && (
            <Button onPress={loadMore} borderRadius="full" colorScheme="success" mt={2}>
              Lihat Selanjutnya
            </Button>
          )}
        </ScrollView>
      )}

    </View>
  );
}

export default CoursePageList;