import React, {useState, useEffect} from 'react';
import { withNavigation } from 'react-navigation'
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';

import api from '../services/api'

 function SpotList({tech, navigation}) {

    function handleNavigate(id) {
        navigation.navigate('Book', { id })
    }

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: {tech}
            })

            setSpots(response.data)

            console.log(response.data)
        }

        loadSpots();
    }, []);

    return (
        <View>
            <Text style={StyleSheet.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList style={styles.list}
            data={spots} 
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (

                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'Gratuito'}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.btn}>
                        <Text style={styles.btnText}>Solicitar reserva</Text>
                    </TouchableOpacity>
                </View>
            )}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 18,
        margin: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 115,
        resizeMode: 'cover',
        borderRadius: 2
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 16,
        color: '#999',
        marginTop: 5
    },

    btn: {
        height: 42,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default withNavigation(SpotList);