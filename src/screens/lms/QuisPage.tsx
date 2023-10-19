import { AppText } from 'components/Text';
import colors from 'config/colors';
import { Box, Button, Center, Divider, HStack, ScrollView, VStack, View } from 'native-base';
import React from 'react'
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';
import { IAnswer, IContent, IQuis } from 'types/ILmsCourse';
import { Batch, Question } from 'types/IQuestion';
import HTML from 'react-native-render-html';
import courseService from '@services/courseService';
import MyLoading from 'components/MyLoading';
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "types/RouteType";

const QuisPage = ({ route }) => {
    const quiz = route.params.content as IContent<IQuis>;
    const content_uuid = route.params.content_uuid as string;
    const batch = quiz.batch
    const slug=route.params.slug;
    const [questionActive, setQuestionActive] = React.useState(0);
    const question = quiz?.content?.questions[questionActive];
    const totalquestion = quiz?.content?.questions?.length ?? 0;
    const alfabet = ["A", "B", "C", "D"]
    const [loading, setLoading] = React.useState(false);
    const navigation= useNavigation<StackNavigation>()

    const onNext = () => {
        if (questionActive + 1 < totalquestion) {
            setQuestionActive(questionActive + 1);
        } else {
            submitAnswer();
            console.log("NOW IS", answers.length < totalquestion && questionActive + 1 === questionActive)
            console.log("ANSWER", answers)
        }
    }
    const [answers, setAnswers] = React.useState<IAnswer[]>([]);
    const checkAnswer = (uuid, answerid) => {
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].question_uuid === uuid && answers[i].answer_id === answerid) {
                return true;
            }
        }
        return false;
    }
    const onAnswer = (item: Question, answer_id: number) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.question_uuid === item.uuid);
            if (existingAnswerIndex !== -1) {
                updatedAnswers[existingAnswerIndex].answer_id = answer_id;
            } else {
                updatedAnswers.push({
                    question_uuid: item.uuid,
                    answer_id: answer_id
                });
            }
            return updatedAnswers;
        });
    }
    const submitAnswer = () => {
        setLoading(true);
        courseService.submitquis(answers, batch?.uuid ?? "", content_uuid).then(response => {
            navigation.navigate('lmspage',{slug:slug})
            setLoading(false);
        })
    }

    const { width } = useWindowDimensions();
    const tagsStyles = {
        p: {
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold'
        }
    };
    return (
        <>
            {loading && (<MyLoading />)}
            <View flex={1} backgroundColor={'#fff'}>
                <VStack space={5} flex={1} padding={5}>
                    <AppText>{`Soal ${questionActive + 1} dari ${totalquestion}`}</AppText>
                    <HTML tagsStyles={tagsStyles} contentWidth={width} source={{ html: `<p>${question?.question}</p>` }} />
                    <ScrollView >
                        <VStack space={3}>
                            {question?.options.map((item, index) => (
                                <TouchableOpacity onPress={() => onAnswer(question, item.id)} key={index}>
                                    <Box borderWidth={1} borderColor={checkAnswer(question?.uuid, item.id) ? 'success.600' : 'gray.300'} padding={2} rounded={10}>
                                        <HStack space={3} alignItems={'center'}>
                                            <Box justifyContent={'center'} alignItems={'center'} backgroundColor={checkAnswer(question.uuid, item.id) ? colors.success700 : colors.bgGrey200} width={7} height={7} rounded={7}>
                                                <AppText color='white' font_type='medium'>{alfabet[index]}</AppText>
                                            </Box>
                                            <AppText flex={1}>{item.option_content}</AppText>
                                        </HStack>
                                    </Box>
                                </TouchableOpacity>
                            ))}
                        </VStack>
                    </ScrollView>
                </VStack>
                <View style={style.navigationfoot}>
                    <Divider />
                    <HStack padding={3} justifyContent={'space-between'}>
                        <Button onPress={() => setQuestionActive(questionActive - 1)} variant={'outline'} opacity={questionActive > 0 ? 1 : 0} borderColor={'success.700'} colorScheme={'success'}>
                            Sebelumnya
                        </Button>
                        <Button disabled={answers.length < totalquestion && questionActive + 1 === totalquestion} onPress={onNext}
                            colorScheme={'emerald'} opacity={answers.length < totalquestion && questionActive + 1 === totalquestion ? 0.5 : 1}>
                            {questionActive + 1 === totalquestion ? 'Kirim' : 'Selanjutnya'}
                        </Button>
                    </HStack>
                </View>
            </View>
        </>
    )
}

export default QuisPage;
const style = StyleSheet.create({
    navigationfoot: {

    }
})