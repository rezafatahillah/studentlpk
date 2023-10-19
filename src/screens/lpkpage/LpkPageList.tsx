import { Box, useDisclose, CheckIcon, Divider, HStack, Icon, Input, ScrollView, Select, Skeleton, View, VStack, Button, Spinner, Actionsheet } from "native-base";
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardListLPK from "components/CardListLPK";
import service from "services/service";
import { ITableParams } from "types/ITableParams";
import { RefreshControl, TouchableOpacity } from 'react-native';
import { Data, DataDetail } from "types/ILPK";
import CardListLPKSkeleton from "components/CardListLPKSkeleton";
import LpkPageFilter from "./LpkPageFilter";
import { AppText } from "components/Text";

const LpkPageList = () => {
  const [lpk, setLpk] = useState<Data | undefined>();
  const [lpkDetail, setLpkDetail] = useState<DataDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    category: string[];
    jenisKelas: string[];
    tingkat: string[];
  }>({
    category: [],
    jenisKelas: [],
    tingkat: [],
  });

  const [params, setParams] = useState<ITableParams>({
    fields: ["*", "lpk_detail.logo"],
    page: 1,
    perPage: 8,
    filters: [],
    sort: [],
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
          column: "name",
          operator: "like",
          value: "%" + value + "%"
        },
      ],
      page: 1,
      sort: [], // Mengosongkan sort
    };
    setParams(newParams);
    setLpkDetail([]); // Mengosongkan lpkDetail
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
    if (lpk && lpk.last_page && params.page !== undefined && params.page < lpk.last_page) {
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
      page: 1,
      perPage: 8,
      filters: [],
      fields: ["*", "lpk_detail.logo"],
      sort: [],
    });
  }

  const showLoadMoreButton = lpk && lpk.last_page !== params.page;

  const handleApplyFilter = (category: string[], jenisKelas: string[], tingkat: string[]) => {
    setAppliedFilters({
      category,
      jenisKelas,
      tingkat
    });
    // Perform other necessary operations with the applied filters
  };
  

  useEffect(() => {
    // console.log(params)
    setLoading(true);
    service.getLpk(params)
      .then(response => {
        // console.log(response)
        if (response !== undefined) {
          setLpk(response);
          if (params.page === 1) {
            setLpkDetail(response.data);
          } else {
            setLpkDetail(prevLpkDetail => [...prevLpkDetail, ...response.data]);
          }
        }
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        console.log("err from component", err);
      });
  }, [params]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 10 }}>
        <VStack>
          <Input
            backgroundColor="white"
            InputLeftElement={
              <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />
            }
            placeholder="Cari LPK"
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
              minWidth={null}
              accessibilityLabel="Semua Status"
              placeholder="Urutkan"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              flex={6}
            >
              <Select.Item label="Rating Tertinggi" value="tertinggi" />
              <Select.Item label="Rating Terendah" value="terendah" />
              <Select.Item label="Terbaru" value="terbaru" />
              <Select.Item label="Terlama" value="terlama" />
            </Select>
          </HStack>
        </VStack>
      </View>
      <Divider />
      <AppText>{appliedFilters.category}{appliedFilters.jenisKelas}{appliedFilters.tingkat}</AppText>

      <LpkPageFilter isOpen={isOpen} onClose={onClose} onApplyFilter={handleApplyFilter} />

      {loading ? (
        <View>
          <Spinner color="emerald.500" />
          <CardListLPKSkeleton />
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
          {Array.isArray(lpkDetail) && lpkDetail.map((item, index) => (
            <CardListLPK data={item} key={index} />
          ))}
          {showLoadMoreButton && (
            <Button onPress={loadMore} borderRadius="full" colorScheme="success" mt={2}>
              Lihat Selanjutnya
            </Button>
          )}
        </ScrollView>
      )
      }


    </View >
  );
}

export default LpkPageList;