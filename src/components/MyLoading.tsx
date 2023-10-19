import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, Image, Text } from 'native-base';
import { AppText } from './Text';

interface Slide {
    caption: string;
    author: string;
}

const slides: Slide[] = [
    {
        caption: 'Pendidikan adalah kunci untuk membuka pintu emas kebebasan.',
        author: 'George Washington Carver'
    },
    {
        caption: 'Kemampuan tidak terlahir dengan kita, tapi dipraktekkan dengan keras bekerja.',
        author: 'Murshid Akram'
    },
    {
        caption: 'Belajar bukanlah suatu hal yang bisa kamu lakukan sebentar lalu selesai. Belajar adalah proses seumur hidup yang terus berlanjut.',
        author: 'Richard Branson'
    },
    {
        caption: 'Orang bijak belajar dari pengalaman. Orang sangat bijak belajar dari pengalaman orang lain.',
        author: 'Zig Ziglar'
    },
    {
        caption: 'Keberhasilan dalam kehidupan tergantung pada kegigihan, pengetahuan, dan keterampilan yang kita miliki. Belajarlah sepanjang hidupmu.',
        author: 'John D. Rockefeller'
    }
];

const MyLoading: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        console.log("masuk interval");
        const interval = setInterval(() => {
            console.log("start interval");
            setCurrentSlide((currentSlide + 1) % slides.length);
        }, 500);
        return () => clearInterval(interval);
    }, [currentSlide]);
    const { author,caption } = slides[currentSlide];
    return (
        <View style={styles.container}>
            <VStack padding={6}>
                <AppText size={16} style={styles.caption}>{caption}</AppText>
                <AppText color='secondary' size={14} style={styles.caption}>-{author}-</AppText>
            </VStack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation:99999999999,
        zIndex:9999999999999
    },
    image: {
        height: 250,
        width: 250,
        resizeMode: 'contain'
    },
    caption: {
        textAlign: 'center'
    }
});

export default MyLoading;
