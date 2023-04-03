import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, Alert, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import socketio from 'socket.io-client'

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })

        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.100.13:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'aprovada' : 'rejeitada'}`);
            })
        })
 
    }, [])

    return ( 
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(techn => <SpotList key={techn} tech={techn} />)}
            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    }
});