import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Header, Body } from './styles';

export default function Card() {
    const navigation = useNavigation();
    const [cardName, setCardName] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    async function findCard() {
        try {
            const response = await api.get(`/cards/search?q=${cardName}`);

            const { id, artist, colors, name, image_uris, legalities } = response.data.data[0]
            
            console.log(id, artist, colors, name, image_uris, legalities);
            console.log(response);
        } catch (err) {
            console.log('erro >>> ', err);
        }
    }

    return (
        <Container>
            <Header>
                <Image source={logo} />

                <TouchableOpacity onPress={navigateBack}>
                    <Icon name="arrow-left" size={28} color="gray" />
                </TouchableOpacity>
            </Header>
            <Body>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-around'
                }}>
                    <TextInput style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 30,
                                marginHorizontal: 10,
                                borderRadius: 25,
                                width: '80%'
                            }} placeholder="Card" onChangeText={setCardName} />
                    <TouchableOpacity onPress={findCard}>
                        <Icon name="search" size={28} color="gray" />
                    </TouchableOpacity>
                </View>
            </Body>
        </Container>
    );
}