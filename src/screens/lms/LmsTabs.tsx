import { AppText } from 'components/Text';
import colors from 'config/colors';
import * as React from 'react';
import { Box, HStack, View, VStack } from 'native-base';
import { useWindowDimensions, ScrollView, SafeAreaView, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IContent, IModule, ITopic } from 'types/ILmsCourse';
import Accordion from 'components/Accordion';
import LmsNote from './LmsNote';
import { CurrentContent } from 'config/tools';
interface dataProps {
    coursedata: IModule[],
    actionSelect:Function,
    slug:string,
    active?: CurrentContent,
}


const LmsTabs = ({ coursedata,actionSelect,slug,active }: dataProps) => {

    const accordiondata = () => {
        return (
            coursedata?.map((item, index) => (
                <Accordion key={index} actionSelect={actionSelect} title={item?.title} data={item.module_content} />
            ))
        )
    }
    const FirstRoute = () => {
        return (

            <View flex={1} >
                <ScrollView>
                    {accordiondata()}
                </ScrollView>
            </View >

        )
    };

    const SecondRoute = () => (
        <LmsNote slug={slug} module_content_uuid={active?.uuid??''}/>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Materi Kelas' },
        { key: 'second', title: 'Catatan' },
    ]);
    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <HStack borderBottomWidth={1} borderBottomColor={colors.LineColor100}>
                {
                    props.navigationState.routes.map((route, i) => {
                        const opacity = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) =>
                                inputIndex === i ? 1 : 0.3
                            ),
                        });
                        return (
                            <TouchableOpacity key={i}
                                onPress={() => setIndex(i)}
                            >
                                <VStack style={{ borderBottomWidth: index === i ? 4 : 0, borderColor: colors.success700 }} padding={3} >
                                    <Animated.Text style={[{ opacity }, { fontFamily: 'Poppins-SemiBold', color: colors.success700 }]}>{route.title}</Animated.Text>
                                </VStack>
                            </TouchableOpacity>
                        );

                    })
                }
            </HStack>
        )
    };
    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}
export default LmsTabs