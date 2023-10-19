import React from 'react';
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';

const Example = () => {
  return (
    <Center w="110%">
      <HStack
        w="90%"
        maxW="100%"
        space={8}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton />
          <HStack space="1" alignItems="center">
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
          </HStack>

          <HStack>
            <Skeleton h="50" rounded="md" startColor="coolGray.100" />
          </HStack>
        </VStack>
      </HStack>
      <HStack
        w="90%"
        maxW="100%"
        space={8}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <VStack flex="3" space="4">
          <Skeleton />
          <HStack space="1" alignItems="center">
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
          </HStack>

          <HStack>
            <Skeleton h="50" rounded="md" startColor="coolGray.100" />
          </HStack>
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
          <Skeleton.Text />
        </VStack>
      </HStack>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
