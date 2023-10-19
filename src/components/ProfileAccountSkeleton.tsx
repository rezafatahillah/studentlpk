import {Box, HStack, Skeleton, VStack} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
var deviceWidth: any = Dimensions.get('window').width;
const ProfileAccountSkeleton = () => {
  return (
    <VStack
      p={0.5}
      borderWidth="1"
      space={8}
      overflow="hidden"
      rounded="md"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton
        borderWidth={1}
        borderColor="coolGray.200"
        endColor="warmGray.50"
        size="70"
        rounded="full"
        mt="70"
        alignSelf={'center'}
      />
      <Skeleton.Text px="4" />
      <Skeleton.Text px="4" />
      <Skeleton.Text px="4" />
      <Skeleton.Text px="4" />
      <Skeleton.Text px="4" />
      <Skeleton rounded="md" />
    </VStack>
  );
};

export default ProfileAccountSkeleton;
