import { Box,VStack } from 'native-base';
import React, { useEffect, useRef } from 'react'
import { Text, Dimensions, StyleSheet, View, Animated } from 'react-native';
import ProgressingIndicator from '@components/Progressing'

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


function IndicatorLoading(props:any){
    const colors:any = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colors, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(colors, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(colors, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(colors, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();


  }, []);
  
    return(
        <View style={{display:'flex'}}>
            <VStack style={styles.container}>
                <Box mt={deviceHeight/2.5} ml={deviceWidth/3}>
                    <CircularProgress bgcolor={props.bgcolor?props.bgcolor:'#03a9f457'} color={props.color?props.color:'#03a9f4'} secondary={props.secondary?props.secondary:'#dff3fb'}/>
                </Box>
            </VStack>
        </View>
    )
}

function CircularProgress({bgcolor,color,secondary}:any){
    const colors:any = useRef(new Animated.Value(0)).current;
    const animation=new Animated.Value(0)

    const startAnimation = () => {
      Animated.loop(Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })).start();
    }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colors, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(colors, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
    startAnimation()
  }, []);
  
    return (
      <View style={{margin:5}}>
        <Box bg={bgcolor} w={95} h={95} p={2} borderRadius={25}>
            <Box><ProgressingIndicator color={color} secondary={secondary}/></Box>
            <Text style={{marginTop:7,color:color,fontSize:16,fontWeight:'bold'}}>Proces...</Text>
        </Box>
      </View>
    )
  }

const styles = StyleSheet.create({
    container: {
    top:0,
    marginTop:0,
    height: deviceHeight*1.5,
    width:deviceWidth,
    backgroundColor:"#97a6f729", // backdrop color
    // backgroundColor:"grey",
    position:'absolute',
    zIndex:999
    }
});
  
  export default IndicatorLoading