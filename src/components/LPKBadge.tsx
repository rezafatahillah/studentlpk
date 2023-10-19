import { HStack, Image, VStack } from 'native-base';
import React from 'react';
import { AppText } from './Text';
import PATH from '@config/api'
import ILpk from 'types/courses/ILpk';
import ICourseInstructor from '@itype/courses/ICourseInstructor'
interface PropsData {
    lpk?: ILpk
    instruktur?: ICourseInstructor[]
}
const LPKBadge = ({ lpk, instruktur }: PropsData) => {
    const image = PATH.pathlpkimage + (!lpk ? '' : lpk.lpk_detail.logo);
    return (

        <HStack space={1} alignContent={'center'}>
            <Image rounded={100} size={8} alt='lpk logo' source={{ uri: image }} w={'20%'} />
            <VStack w={'80%'}>
                <AppText numberOfLines={1} ellipsizeMode="tail" size={8} >{lpk?.name}</AppText>
                <HStack space={1}>
                    <AppText size={8} color={'secondary'}>Instructur</AppText>
                    {
                        instruktur?.map((item, index) => (
                            <AppText numberOfLines={1} ellipsizeMode="tail" size={8} color={'success'} key={index}>
                                {`${item?.instructors?.firstname} ${item?.instructors?.lastname}`}
                            </AppText>
                        ))
                    }

                </HStack>
            </VStack>
        </HStack>
    )
}

export default LPKBadge;