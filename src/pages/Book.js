import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Alert, TouchableOpacity, AsyncStorage, TextInput, Text } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {

        console.log('id do caboclo: ', id);

        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return(
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.label}>DATA DA RESERVA</Text>

            <TextInput style={styles.input}
            placeholder="Qual dia você quer reservar?" 
            autoCapitalize="words" 
            autoCorrect={false}
            value={date}
            onChangeText={text => setDate(text)}
            keyboardType="email-address" 
            placeholderTextColor="#999"/>

            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.btnText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.btn, styles.cancelBtn]}>
                <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        margin: 30
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

    cancelBtn: {
        backgroundColor: '#CCC'
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})