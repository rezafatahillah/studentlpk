import { AppText } from "components/Text";
import colors from "config/colors";
import { Divider, HStack, Progress, Skeleton, View, VStack } from "native-base";
import React from "react";
import { IContent, ILmsCourse, IModule, IQuis, ITopic } from "types/ILmsCourse";
import LmsTabs from "./LmsTabs";
import courseService from "@services/courseService";
import { CurrentContent, getFirstIncompleteModuleContentUUID } from "config/tools";
import LmsContent from "./LmsContent";

const LmsPage = (route) => {
    const slug = route.route.params.slug
    const [lmsdata, setLmsdata] = React.useState<ILmsCourse>({
        course_title: '',
        coursedata: [],
        is_rated: false,
        progress: 0,
        uuid:''
    });
    const [currentContent, setCurrentContent] = React.useState<CurrentContent>({ uuid: '', content_type: '', progress_status: '' });
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const getModuleList = (slug: string) => {
        setRefresh(true)
        courseService.getcoursebyslug(slug).then(response => {
            const ret = response.data.data;
            setLmsdata(ret);
            const active = getFirstIncompleteModuleContentUUID(ret.coursedata);
            if(!active.uuid){
              
                console.log("data",ret.is_rated);
                const last=ret.coursedata[ret.coursedata.length-1]
                const lastcontent=last.module_content[0]
                console.log("modelu",lastcontent);
                const activepost={
                    uuid:lastcontent.uuid,
                    content_type:lastcontent.content_type,
                    progress_status:lastcontent.progress.progress_status,
                    is_rated:ret.is_rated
                }
                console.log("ACTIVE KOSONG", activepost)
                setCurrentContent(activepost);
              //  setCurrentContent(activepost);
            }else{
                console.log("ACTIVE ISI", active)
                setCurrentContent(active);
            }
           
            setRefresh(false)
        }).catch(err => {
            setRefresh(false)
        });
    }
    React.useEffect(() => {
        console.log("START NEW")
        getModuleList(slug);
    }, [])
    const selectTopic = (newTopic: CurrentContent) => {
        if (newTopic?.uuid) {
            setCurrentContent(newTopic);
        } else {
            getModuleList(slug);
        }
    }

    return (
        refresh ? (
            <VStack flex={1}>
                <Skeleton h="40%" />
                <VStack padding={5} space={2}>
                    <Skeleton h="5" />
                    <Skeleton h="5" />
                    <Divider />
                    <Skeleton h="10" />
                    <Divider />
                    <Skeleton h="10" />
                    <Skeleton h="10" />
                    <Skeleton h="10" />
                </VStack>
            </VStack>
        ) : (
            <VStack flex={1} backgroundColor={'#fff'}>
                <LmsContent actionSelect={selectTopic} course_uuid={lmsdata.uuid} slug={slug} active={currentContent} />
                <VStack padding={4} borderBottomWidth={1} borderBottomColor={colors.bgGrey500} >
                    <HStack justifyContent={'space-between'}>
                        <AppText font_type="medium">Progress Kelas</AppText>
                        <AppText font_type="medium">{Math.round(lmsdata.progress)}%</AppText>
                    </HStack>
                    <Progress colorScheme="emerald" value={Math.round(lmsdata.progress)} />
                </VStack>
                <LmsTabs actionSelect={selectTopic} active={currentContent} slug={slug} coursedata={lmsdata.coursedata as unknown as IModule[]} />
            </VStack >
        )
    );
}

export default LmsPage;
