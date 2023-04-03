import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png'
import api from '../services/api';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(success => {

            if(success) {
             
                navigation.navigate('List');

            }
        })
    }, [])

    async function handleSubmit() {

        const response = await api.post('/sessions', {
            email: email
        })

        const {_id} = response.data;

        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        console.log('ide: ', _id)

        console.log(email)
        console.log(techs)

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>

                <TextInput style={styles.input}
                placeholder="Seu e-mail" 
                autoCapitalize="none" 
                autoCorrect={false}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address" 
                placeholderTextColor="#999"/>

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                
                <TextInput style={styles.input}
                placeholder="Tecnologias de interesse" 
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={text => setTechs(text)}
                placeholderTextColor="#999"/>

                <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text style={styles.btnText}>Encontrar spots</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    btn: {
        height: 42,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});